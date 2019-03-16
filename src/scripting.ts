import Queue from 'typescript-collections/dist/lib/Queue';
import { isUndefined } from 'typescript-collections/dist/lib/util';

export enum Status {
    RUNNING,
    SUCCESS,
    FAILURE
}

function terminateAndReturn(id: number, blackboard: any, status: Status) {
    nodeStatusMap[id] = status;
    delete blackboard[id];
    return status;
}

export type Effect = () => void;
export type Precondition = () => boolean;
export type Tick = () => Status;
export type ActionTick = (precondition: Precondition, effect: Effect, ticksRequired?: number) => Tick;
/**
 * The guard tick is to add a precondition to the composite ticks
 */
export type GuardTick = (precondition: Precondition, astTick: Tick, negate?: boolean) => Tick;
/**
 * Sequence/Selector
 */
export type CompositeTick = (astTicks: Tick[]) => Tick;

var blackboard = {};
var nodeStatusMap = {};

export function clearNodeStatus(id: number) {
    delete nodeStatusMap[id]
}

function getActionTick(id: number): ActionTick {
    return (precondition, effect, ticksRequired = 1) => {
        return () => {
            if (precondition()) {
                if (!blackboard[id]) {
                    blackboard[id] = {};
                    blackboard[id].ticksDone = ticksRequired;
                }

                if (blackboard[id].ticksDone > 0) {
                    blackboard[id].ticksDone--;
                    nodeStatusMap[id] = Status.RUNNING;
                    return Status.RUNNING;
                } else {
                    effect();
                    return terminateAndReturn(id, blackboard, Status.SUCCESS);
                }
            } else {
                nodeStatusMap[id] = Status.FAILURE;
                return Status.FAILURE; //TODO should be terminateandreturn?
            }
        }
    }
}

function getGuardTick(id: number): GuardTick {
    return (precondition, astTick, negate = false) => {
        return () => {
            let proceed = negate ? !precondition() : precondition();
            let status = proceed ? execute(astTick) : Status.FAILURE;
            nodeStatusMap[id] = status;
            return status;
        }
    }
}

function getSequenceTick(id: number): CompositeTick {
    return (astTicks) => {
        return () => {
            if (!blackboard[id]) {
                blackboard[id] = {};
                blackboard[id].currentIndex = 0;
            }

            while (blackboard[id].currentIndex < astTicks.length) {
                var childStatus = execute(astTicks[blackboard[id].currentIndex]);

                if (childStatus == Status.RUNNING) {
                    nodeStatusMap[id] = Status.RUNNING;
                    return Status.RUNNING;
                } else if (childStatus == Status.FAILURE) {
                    return terminateAndReturn(id, blackboard, Status.FAILURE);
                } else if (childStatus == Status.SUCCESS) {
                    blackboard[id].currentIndex += 1;
                }
            }
            return terminateAndReturn(id, blackboard, Status.SUCCESS);
        }
    }
}

function getSelectorTick(id: number): CompositeTick {
    return (astTicks) => {
        return () => {
            if (!blackboard[id]) {
                blackboard[id] = {};
                blackboard[id].currentIndex = 0;
            }

            while (blackboard[id].currentIndex < astTicks.length) {
                var childStatus = execute(astTicks[blackboard[id].currentIndex]);

                if (childStatus == Status.RUNNING) {
                    nodeStatusMap[id] = Status.RUNNING;
                    return Status.RUNNING;
                } else if (childStatus == Status.SUCCESS) {
                    return terminateAndReturn(id, blackboard, Status.SUCCESS);
                } else if (childStatus == Status.FAILURE) {
                    blackboard[id].currentIndex += 1;
                }
            }
            return terminateAndReturn(id, blackboard, Status.FAILURE);
        }
    }
}

export function execute(astTick: Tick): Status {
    return astTick();
}

var globalIdCounter = 0;

export function action(precondition: Precondition, effect: Effect, ticksRequired?: number): Tick {
    return getActionTick(++globalIdCounter)(precondition, effect, ticksRequired)
}

export function guard(precondition: Precondition, astTick: Tick): Tick {
    return getGuardTick(++globalIdCounter)(precondition, astTick);
}

export function neg_guard(precondition: Precondition, astTick: Tick): Tick {
    return getGuardTick(++globalIdCounter)(precondition, astTick, true);
}

/**
 * Cycles over its children: iterates to the next child on success of a child
 * Succeeds if all succeed, else fails
 * @param {Tick[]} astTicks
 * @returns {Tick}
 */
export function sequence(astTicks: Tick[]): Tick {
    return getSequenceTick(++globalIdCounter)(astTicks);
}

/**
 * Cycles over its children: iterates to the next child on failure of a child(think of it as if-else blocks)
 * Succeeds if even one succeeds, else fails
 * @param {Tick[]} astTicks
 * @returns {Tick}
 */
export function selector(astTicks: Tick[]): Tick {
    return getSelectorTick(++globalIdCounter)(astTicks);
}

export function getLastNodeId(): number {
    return globalIdCounter;
}

export function getNodeIdStatusMap() {
    return nodeStatusMap;
}

/*--------------- APIs --------------- */

//0. utilities
// min and max are inclusive
export function getRandNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//1. story instance

//1.1 locations
// var locationGraph: Dictionary<Location> = {};

var locationGraph = {};

// //
// class Location {
//     adjacentLocations: Dictionary<Location[]>;

//     constructor(public name: string, adjacentLocations: string[]) {
//         this.name = name;

//         for (var i = 0; i < adjacentLocations.length; i++) {
//             if(adjacentLocations[i] in locationGraph){

//             }
//             else{
//                 var new_location = new Location()
//             }
//         }

//     }
// }

//add to both sides
export function addLocation(locationName: string, adjacentLocations: string[]) {
    if (locationGraph[locationName] == undefined)
        locationGraph[locationName] = [];
    locationGraph[locationName] = locationGraph[locationName].concat(adjacentLocations);

    for (var i = 0; i < adjacentLocations.length; i++) {
        if (locationGraph[adjacentLocations[i]] == undefined)
            locationGraph[adjacentLocations[i]] = [];

        locationGraph[adjacentLocations[i]].push(locationName);
    }
}

export function areAdjacent(location1: string, location2: string): boolean {
    console.log("Are adjacent: " + location1 + ", " + location2);
    if (locationGraph[location1] == undefined || locationGraph[location2] == undefined) {
        console.log("Either one/both locations undefined");
        return false;
    }

    for (var i = 0; i < locationGraph[location1].length; i++) {
        if (locationGraph[location1][i] == location2) {
            return true;
        }
    }
    return false;
}

//pathfinding primitives
export function getNextLocation(start: string, destination: string): string {
    var visited = {};
    var previous = {};
    for (var key in locationGraph) {
        visited[key] = false;
    }
    visited[start] = true;

    var myQueue = new Queue<string>();
    myQueue.enqueue(start);

    var current;
    while (!myQueue.isEmpty()) {
        current = myQueue.dequeue();
        if (current === destination) {
            break;
        }
        var neighbors = locationGraph[current];

        for (var i = 0; i < neighbors.length; i++) {
            if (!visited[neighbors[i]]) {
                myQueue.enqueue(neighbors[i]);
                visited[neighbors[i]] = true;
                previous[neighbors[i]] = current;
            }
        }
    }

    current = destination;
    if (current == start)
        return current;
    while (previous[current] != start) {
        current = previous[current];
    }

    return current;
}

//1.2 agents

export class Agent {
    currentLocation: string;
    destination: string;
    currentBehaviorTree: Tick[];

    // Specific to Maddie's game? Move to lib fn?
    lastSeenItem: { [itemName: string]: string } = {};
    lastSeenPerson: { [itemName: string]: string } = {};
    randNumber: number = 0;

    constructor(public name: string) {
        this.name = name;
    }

    setCurrentLocation(currentlocation: string) {
        this.currentLocation = currentlocation;
    }

    getNextLocation() {
        return action(
            () => true,
            () => {
                this.currentLocation = getNextLocation(this.currentLocation, this.destination);
                //console.log(this.name, ' at: ', this.currentLocation);
            },
            0
        );
    }

    setDestination(destination: string) {
        this.destination = destination;
    }

    setBehaviorTree(behaviorTree: Tick[]) {
        this.currentBehaviorTree = behaviorTree;
    }

    // Seems specific to Maddie's game? Move to a lib function?
    setLastSawItemAtLocation(item: Item, atLocation: string) {
        this.lastSeenItem[item.name] = atLocation;
    }

    setLastSawPersonAtLocation(agentName: string, atLocation: string) {
        this.lastSeenPerson[agentName] = atLocation;
    }

    hasSeenItem(item: Item) {
        if (item.name in this.lastSeenItem) {
            //console.log(this.name + ': saw item:' + item.name);
            return true; //this.lastSeenItem[item.name]
        }
        return false;
    }

    whereIsItem(item: Item) {
        if (item.name in this.lastSeenItem) {
            //console.log(this.name + ': saw item:' + item.name + ' at location:' + this.lastSeenItem[item.name]);
            return this.lastSeenItem[item.name]
        }
        return false;
    }

}

var agents: Array<Agent> = new Array<Agent>();
// var agents = [];

export function addAgent(agentName: string) {
    //console.log("Adding: " + agentName);
    var agent = new Agent(agentName);
    //console.log(agent);
    agents.push(agent);
    return agent;
}

//1.3 items

// Todo
class Item {
    currentLocation: string;

    constructor(public name: string) {
        this.name = name;
    }

    setCurrentLocation(currentlocation: string) {
        this.currentLocation = currentlocation;
    }
}

var items: Array<Item> = new Array<Item>();
// var items = [];

export function addItem(itemName: string) {
    var item = new Item(itemName);
    items.push(item);
    return item;
}

//1.4 variables
var variables = {};
var agentVariables = {};
var itemVariables = {};

export function setVariable(varName: string, value: any) {
    variables[varName] = value;
    return varName;
}

export function setAgentVariable(agent: string, varName: string, value: any) {
    if (isUndefined(agentVariables[agent]))
        agentVariables[agent] = {};

    agentVariables[agent][varName] = value;
    return value;
}

export function getVariable(varName: string): any {
    if (isUndefined(variables[varName])) {
        console.log("Variable " + varName + " not set!");
        return;
    }
    return variables[varName];
}

export function getAllVariables() {
    return variables;
}

export function getAgentVariable(agent: string, varName: string) {
    if (isUndefined(agentVariables[agent]) || isUndefined(agentVariables[agent][varName])) {
        console.log("Variable " + varName + " for agent " + agent + " not set!")
        return;
    }
    return agentVariables[agent][varName];
}

export function isVariableNotSet(varName: string): boolean {
    return isUndefined(variables[varName]);
}

export function isAgentVariableNotSet(agent: string, varName: string): boolean {
    return isUndefined(agentVariables[agent]) || isUndefined(agentVariables[agent][varName]);
}

// todo
export function setItemVariable(item: Item, varName: string, value: any) {
    if (isUndefined(itemVariables[item.name]))
        itemVariables[item.name] = {};

    itemVariables[item.name][varName] = value;
    return value;
}

export function getItemVariable(item: string, varName: string) {
    if (isUndefined(itemVariables[item]) || isUndefined(itemVariables[item][varName])) {
        console.log("Variable " + varName + " for item " + item + " not set!")
        return;
    }
    return itemVariables[item][varName];
}

//2
//agent-behavior tree mapping

var agentTrees: { [agentName: string]: Tick } = {};
// var agentTrees = {};

export function attachTreeToAgent(agent: Agent, tree: Tick) {
    agentTrees[agent.name] = tree;
}

//3.1
//user actions
//TODO add variables to user action texts
var userInteractionObject: { text: string, userActionsText: string[], actionEffectsText: string } = {
    text: "",
    userActionsText: [],
    actionEffectsText: ""
}
var userInteractionTrees: Tick[] = [];
var userActions = {};

function runUserInteractionTrees() {
    userInteractionObject.text = "";
    userInteractionObject.userActionsText = [];
    userActions = {}; //{"Go to location X" : effect
    for (var i = 0; i < userInteractionTrees.length; i++) {
        execute(userInteractionTrees[i]);
    }
}

export let displayDescriptionAction = (text: string) =>
    action(
        () => true,
        () => userInteractionObject.text += getTextWithVariablesReplaced(text),
        0
    );
export let displayActionEffectText = (text: string) => userInteractionObject.actionEffectsText += getTextWithVariablesReplaced(text);

export let addUserActionTree = (text: string, effectTree: Tick) => action(
    () => true,
    () => mapUserActionToTree(text, effectTree), 0
);

export let addUserAction = (text: string, effect: () => any) =>
    action(
        () => true,
        () => mapUserActionToTree(text, action(() => true, effect, 0)), 0
    );

function mapUserActionToTree(text: string, tree: Tick) {
    userActions[text] = tree;
    userInteractionObject.userActionsText.push(text);
}

export function addUserInteractionTree(tick: Tick) {
    userInteractionTrees.push(tick);
}

export function executeUserAction(text: string) {
    //execute the user action
    userInteractionObject.actionEffectsText = "";
    var userActionEffectTree = userActions[text];
    execute(userActionEffectTree);
}

//4.
export function initialize() {
    console.log(variables);
    runUserInteractionTrees();
}

export function getUserInteractionObject() {
    return userInteractionObject;
}

export function worldTick(): {} {
    //all agent ticks
    for (var i = 0; i < agents.length; i++) {
        var tree = agentTrees[agents[i].name];
        if (!isUndefined(tree)) {
            setVariable("executingAgent", agents[i].name);
            execute(tree);
        }
    }
    runUserInteractionTrees();

    return userInteractionObject;
}

function getTextWithVariablesReplaced(text: string) {
    let words = text.split(' ');
    let re = new RegExp('[A-Za-z0-9_]+');
    for (var i = 0; i < words.length; i++) {
        if (words[i].startsWith('$')) {
            var arr = re.exec(words[i]);
            let variableName = arr === null ? "" : arr[0];

            let variableValue = getVariable(variableName);
            console.log(variableValue);
            if (variableValue !== undefined)
                words[i] = words[i].replace('$' + variableName, variableValue);
        }
    }

    return words.join(' ');
}

export function reset() {
    blackboard = {};
    nodeStatusMap = {}
    globalIdCounter = 0;
    agents = new Array<Agent>();
    locationGraph = {};
    items = new Array<Item>();
    variables = {};
    agentVariables = {};
    itemVariables = {};
    agentTrees = {};
    userInteractionObject = {
        text: "",
        userActionsText: [],
        actionEffectsText: ""
    }
    userInteractionTrees = [];
    userActions = {};
}
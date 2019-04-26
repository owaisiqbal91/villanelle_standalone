import { Card, Code, Elevation, H5, Icon, Intent, ITreeNode, Tag, Tooltip, Tree, IconName } from '@blueprintjs/core';
import * as React from 'react';
import { Status, clearNodeStatus } from '../scripting';

export class VillanelleTreeVisualizer extends React.Component<{
    doc: {},
    errors: {},
    showDebugState: boolean,
    nodeIdToDatapathMap?: {},
    nodeIdStatusMap?: {},
    rootNodeDatapaths?: string[],
    dataPathToNodeStatusMap?: {},
    dataPathToNodeIdMap?: {}
}, {
    nodesExpanded: {}
}> {

    errorDatapaths;

    constructor(props) {
        super(props);
        // console.log(this.props.doc);
        // console.log(this.props.errors);
        // this.errorDatapaths = Object.keys(this.props.errors);
        // var nodes = this.getNodeTree(this.props.doc, this.props.errors);
        this.state = {
            nodesExpanded: {}
        }
    }

    count = 0;
    getNodeTree(doc, errors): ITreeNode[] {
        let reservedKeywords = ['Initialization', 'User Interaction'];

        if (errors['/']) {
            return [];
        }
        var treeNodes = [];
        if (doc['Initialization'] !== undefined) {
            var initializationNode;
            if (errors['/Initialization']) {
                initializationNode = this.getErrorTreeNode(errors['/Initialization'].message, 'Initialization');
            } else {
                this.count++;
                initializationNode = {
                    id: this.count,
                    hasCaret: true,
                    icon: "code-block",
                    label: "Initialization",
                    isExpanded: this.shouldNodeExpand('/Initialization'),
                    childNodes: [],
                    nodeData: { text: "Initialization", dataPath: '/Initialization' }
                }
                var initializationChildNodes = this.getEffectsNodes(doc['Initialization'], errors, "/Initialization");
                initializationNode.childNodes = initializationChildNodes;
            }
            treeNodes.push(initializationNode);
        }

        for (let key in doc) {
            if (!reservedKeywords.includes(key)) {
                var agentNode;
                if (errors['/' + key]) {
                    agentNode = this.getErrorTreeNode(errors['/' + key].message, key);
                } else {
                    var childNode = this.getObjectNode(doc[key], errors, "/" + key);
                    this.count++;
                    agentNode = {
                        id: this.count,
                        hasCaret: true,
                        icon: "person",
                        label: key,
                        isExpanded: this.shouldNodeExpand('/' + key),
                        childNodes: Array.isArray(childNode) ? childNode : [childNode],
                        nodeData: { text: key, dataPath: "/" + key }
                    }
                }
                treeNodes.push(agentNode);
            }
        }

        if (doc['User Interaction'] !== undefined) {
            var userInteractionNode;
            if (errors['/User Interaction']) {
                userInteractionNode = this.getErrorTreeNode(errors['/User Interaction'].message, 'User Interaction');
            } else {
                this.count++;
                userInteractionNode = {
                    id: this.count,
                    hasCaret: true,
                    icon: "social-media",
                    label: "User Interaction",
                    isExpanded: this.shouldNodeExpand('/User Interaction'),
                    childNodes: [],
                    nodeData: { text: "User Interaction", dataPath: "/User Interaction" }
                }
                var interactionChildNodes = this.getArrayNode(doc['User Interaction'], errors, "/User Interaction");
                userInteractionNode.childNodes = interactionChildNodes;
            }
            treeNodes.push(userInteractionNode);
        }

        this.count = 0;
        return treeNodes;
    }

    //the third parameter is the one passed on from errors that have paths on array items
    getObjectNode(obj, errors, dataPath, errorForObject?) {

        var status;
        if (obj !== null) {
            var conditionNode, nodeToBuild;
            if (obj['condition'] !== undefined) {

                if (errors[dataPath + "/condition"]) {
                    conditionNode = this.getErrorTreeNode(errors[dataPath + "/condition"].message, obj['condition']);
                    conditionNode.hasCaret = true;
                } else {
                    this.count++;
                    let status = this.getStatusForNode(dataPath + '/condition');
                    conditionNode = {
                        id: this.count,
                        hasCaret: true,
                        icon: this.createDebugIntentForIcon("help", status),
                        isExpanded: this.shouldNodeExpand(dataPath + '/condition') || this.shouldNodeExpand(dataPath),
                        label: this.createDebugIntentForLabel(obj['condition'], status),
                        childNodes: [],
                        nodeData: { text: obj['condition'], dataPath: dataPath + '/condition' }
                    };
                }
            }

            if (obj['sequence'] !== undefined) {
                if (errors[dataPath + '/sequence']) {
                    nodeToBuild = this.getErrorTreeNode(errors[dataPath + '/sequence'].message, 'sequence');
                } else {
                    this.count++;
                    status = this.getStatusForNode(dataPath + '/sequence');
                    nodeToBuild = {
                        id: this.count,
                        hasCaret: true,
                        isExpanded: this.shouldNodeExpand(dataPath + '/sequence'),
                        icon: this.createDebugIntentForIcon("arrow-right", status),
                        label: this.createDebugIntentForLabel("sequence", status),
                        childNodes: [],
                        nodeData: { text: 'sequence', dataPath: dataPath + '/sequence' }
                    };
                    nodeToBuild.childNodes = this.getArrayNode(obj['sequence'], errors, dataPath + "/sequence");
                }
            } else if (obj['selector'] !== undefined) {
                if (errors[dataPath + '/selector']) {
                    nodeToBuild = this.getErrorTreeNode(errors[dataPath + '/selector'].message, 'selector');
                } else {
                    this.count++;
                    status = this.getStatusForNode(dataPath + '/selector');
                    nodeToBuild = {
                        id: this.count,
                        hasCaret: true,
                        isExpanded: this.shouldNodeExpand(dataPath + '/selector'),
                        icon: this.createDebugIntentForIcon("flow-branch", status),
                        label: this.createDebugIntentForLabel("selector", status),
                        childNodes: [],
                        nodeData: { text: 'selector', dataPath: dataPath + '/selector' }
                    };
                    nodeToBuild.childNodes = this.getArrayNode(obj['selector'], errors, dataPath + "/selector");
                }
            } else if (obj['effects'] !== undefined) {
                status = this.getStatusForNode(dataPath);
                if (obj['effects'] != null)
                    nodeToBuild = this.getEffectsNodes(obj['effects'], errors, dataPath + "/effects", status);
                if (conditionNode === undefined) {
                    this.count++;
                    conditionNode = {
                        id: this.count,
                        hasCaret: true,
                        icon: "help",
                        isExpanded: this.shouldNodeExpand(dataPath + '/effects'),
                        label: "true",
                        childNodes: [],
                        nodeData: { text: 'true', dataPath: dataPath + '/effects' }
                    };
                }

                conditionNode.icon = this.createDebugIntentForIcon(conditionNode.icon, status);
                conditionNode.label = this.createDebugIntentForLabel(conditionNode.label, status);

                if (obj['effect text'] !== undefined) {
                    if (nodeToBuild == undefined) {
                        nodeToBuild = []
                    }
                    if (errors[dataPath + '/effect text']) {
                        nodeToBuild.push(this.getErrorTreeNode(errors[dataPath + '/effect text'].message, obj['effect text'] + ''));
                    } else {
                        this.count++;
                        nodeToBuild.push({
                            id: this.count,
                            hasCaret: false,
                            icon: this.createDebugIntentForIcon("comment", status),
                            label: this.createDebugIntentForLabel(<Tooltip content="effect text"><i>{'"' + obj['effect text'] + '"'}</i></Tooltip>, status),
                            nodeData: { text: <i>{obj['effect text']}</i>, dataPath: dataPath + '/effect text' }
                        });
                    }
                }

                if (obj['ticks'] !== undefined) {
                    var tickLabel;
                    if (errors[dataPath + '/ticks']) {
                        tickLabel = (<Tooltip content={errors[dataPath + '/ticks'].message} intent={Intent.DANGER}>
                            <Icon icon="error" color="red"></Icon>
                        </Tooltip>);
                    } else {
                        tickLabel = (<div><Icon icon="time" /> {obj['ticks']}</div>);
                    }
                    if (conditionNode !== undefined) {
                        conditionNode.secondaryLabel = tickLabel;
                    } else { //attach to first effects statement
                        nodeToBuild[0].secondaryLabel = tickLabel;
                    }
                }
            } else if (obj['description'] !== undefined) {
                if (errors[dataPath + '/description']) {
                    nodeToBuild = this.getErrorTreeNode(errors[dataPath + '/description'], obj['description']);
                } else {
                    this.count++;
                    let status = this.getStatusForNode(dataPath + '/description');
                    nodeToBuild = {
                        id: this.count,
                        hasCaret: false,
                        icon: this.createDebugIntentForIcon("paragraph", status),
                        label: this.createDebugIntentForLabel(<Tooltip content="description"><i>{'"' + obj['description'] + '"'}</i></Tooltip>, status),
                        nodeData: { text: <i>{obj['description']}</i>, dataPath: dataPath + '/description' }
                    };
                }
            } else if (obj['user action']) {
                if (errors[dataPath + '/user action']) {
                    nodeToBuild = this.getErrorTreeNode(errors[dataPath + '/user action'].message, 'user action');
                } else {
                    this.count++;
                    let status = this.getStatusForNode(dataPath + '/user action');
                    nodeToBuild = {
                        id: this.count,
                        hasCaret: true,
                        icon: this.createDebugIntentForIcon("select", status),
                        label: this.createDebugIntentForLabel("user action", status),
                        childNodes: [],
                        isExpanded: this.shouldNodeExpand(dataPath + '/user action'),
                        nodeData: { text: "user action", dataPath: dataPath + '/user action' }
                    }
                    if (obj['user action']['action text'] !== undefined) {
                        if (errors[dataPath + '/user action/action text']) {
                            nodeToBuild.childNodes.push(this.getErrorTreeNode(errors[dataPath + '/user action/action text'].message, obj['user action']['action text'] + ''));
                        } else {
                            this.count++;
                            nodeToBuild.childNodes.push({
                                id: this.count,
                                hasCaret: false,
                                icon: this.createDebugIntentForIcon("font", status),
                                isExpanded: this.shouldNodeExpand(dataPath + '/user action/action text'),
                                label: this.createDebugIntentForLabel(<b>{'"' + obj['user action']['action text'] + '"'}</b>, status),
                                nodeData: { text: <b>{obj['user action']['action text']}</b>, dataPath: dataPath + '/user action/action text' }
                            })
                        }
                    }
                    if (obj['user action']['effect tree'] !== undefined) {
                        var effectTreeNode;

                        if (errors[dataPath + '/user action/effect tree']) {
                            effectTreeNode = this.getErrorTreeNode(errors[dataPath + '/user action/effect tree'].message, 'effect tree');
                        } else {
                            this.count++;
                            effectTreeNode = {
                                id: this.count,
                                hasCaret: true,
                                icon: "tree",
                                label: "effect tree",
                                childNodes: [],
                                isExpanded: this.shouldNodeExpand(dataPath + '/user action/effect tree'),
                                nodeData: { text: "effect tree", dataPath: dataPath + '/user action/effect tree' }
                            };
                        }

                        let effectTreeChildNodes = this.getObjectNode(obj['user action']['effect tree'], errors, dataPath + "/user action/effect tree");
                        if (effectTreeChildNodes) {
                            effectTreeNode.childNodes = Array.isArray(effectTreeChildNodes) ? effectTreeChildNodes : [effectTreeChildNodes];
                        }
                        nodeToBuild.childNodes.push(effectTreeNode);
                    }
                }
            }

            if (nodeToBuild !== undefined) {
                if (conditionNode !== undefined) {
                    conditionNode.childNodes = Array.isArray(nodeToBuild) ? nodeToBuild : [nodeToBuild];
                    return errorForObject && !conditionNode.nodeData.isError ? this.makeErrorTreeNodeForExistingNode(conditionNode, errorForObject) : conditionNode;
                } else return errorForObject && !nodeToBuild.nodeData.isError ? this.makeErrorTreeNodeForExistingNode(nodeToBuild, errorForObject) : nodeToBuild;
            } else if (errorForObject !== undefined) {
                return this.getErrorTreeNode(errorForObject.message, obj + '');
            }
        }
    }

    getArrayNode(arr, errors, dataPath) {
        return arr.map((obj, index) => {
            if (obj !== null) {
                if (errors[dataPath + '/' + index]) {
                    let error = errors[dataPath + '/' + index];
                    return this.getObjectNode(obj, errors, dataPath + "/" + index, error);
                }
                return this.getObjectNode(obj, errors, dataPath + "/" + index)
            } else {
                this.count++;
                return {
                    id: this.count,
                    hasCaret: false,
                    label: (<Tooltip content="Null object" intent={Intent.DANGER}><Icon icon="error" color="red"></Icon></Tooltip>),
                    childNodes: []
                }
            }
        }).filter(obj => obj !== undefined);
    }

    getEffectsNodes(effects: string[], errors, dataPath, status?: Status) {
        return effects.map((effect, index) => {
            if (errors[dataPath + '/' + index]) {
                return this.getErrorTreeNode(errors[dataPath + '/' + index].message, effect + "");
            } else {
                this.count++;
                return {
                    id: this.count,
                    hasCaret: false,
                    label: this.createDebugIntentForLabel(<Code>{effect}</Code>, status),
                    icon: this.createDebugIntentForIcon("code", status),
                    nodeData: { text: <Code>{effect}</Code>, dataPath: dataPath + '/' + index }
                }
            }
        });
    }

    private makeErrorTreeNodeForExistingNode(node: ITreeNode, error) {
        node.icon = <Tooltip content={error.message} intent={Intent.DANGER}><Icon icon="error" color="red"></Icon></Tooltip>;
        node.label = (<Tooltip content={error.message} intent={Intent.DANGER}>
            <Tag intent={Intent.DANGER} large={true} interactive={false} active={false} minimal={true}>{node.nodeData['text']}</Tag>
        </Tooltip>)
        return node;
    }

    private getErrorTreeNode(errorMessage: string, text: string) {
        this.count++;
        return {
            id: this.count,
            hasCaret: false,
            icon: <Tooltip content={errorMessage} intent={Intent.DANGER}><Icon icon="error" color="red"></Icon></Tooltip>,
            label: (<Tooltip content={errorMessage} intent={Intent.DANGER}>
                <Tag intent={Intent.DANGER} large={true} interactive={false} active={false} minimal={true}>{text}</Tag>
            </Tooltip>),
            isExpanded: true,
            nodeData: { isError: true }
        }
    }

    private shouldNodeExpand(dataPath: string) {
        let dataPathOnError = this.isDatapathOnErrorPath(dataPath);
        //TODO uncomment below
        return dataPathOnError ? true : this.state.nodesExpanded[dataPath];
    }

    private isDatapathOnErrorPath(dataPath: string) {
        if (this.errorDatapaths) {
            for (var i = 0; i < this.errorDatapaths.length; i++) {
                if (this.errorDatapaths[i].startsWith(dataPath)) {
                    return true;
                }
            }
        }

        return false;
    }

    private getStatusForNode(dataPath: string) {
        if (this.props.showDebugState) {
            let nodeStatus: Status = this.props.dataPathToNodeStatusMap[dataPath];
            return nodeStatus;
        }
    }

    private createDebugIntentForIcon(iconName: IconName, status: Status) {
        switch (status) {
            case Status.SUCCESS:
                return <Icon icon={iconName} color="green" />
            case Status.RUNNING:
                return <Icon icon={iconName} color="blue" />
            case Status.FAILURE:
                return <Icon icon={iconName} color="red" />
            default:
                return iconName;
        }
    }

    private createDebugIntentForLabel(labelElement, status: Status) {
        switch (status) {
            case Status.SUCCESS:
                return (<Tag intent={Intent.SUCCESS} large={true} interactive={false} active={false} minimal={true}>{labelElement}</Tag>)
            case Status.RUNNING:
                return (<Tag intent={Intent.PRIMARY} large={true} interactive={false} active={false} minimal={true}>{labelElement}</Tag>)
            case Status.FAILURE:
                return (<Tag intent={Intent.DANGER} large={true} interactive={false} active={false} minimal={true}>{labelElement}</Tag>)
            default:
                return labelElement
        }
    }

    private handleNodeCollapse = (nodeData: ITreeNode) => {
        nodeData.isExpanded = false;
        var nodesExpanded = this.state.nodesExpanded;
        nodesExpanded[nodeData.nodeData['dataPath']] = false;
        this.setState({ nodesExpanded: nodesExpanded });
    };

    private handleNodeExpand = (nodeData: ITreeNode) => {
        nodeData.isExpanded = true;
        var nodesExpanded = this.state.nodesExpanded;
        nodesExpanded[nodeData.nodeData['dataPath']] = true;
        this.setState({ nodesExpanded: nodesExpanded });
    };

    render() {
        //console.log(this.props.dataPathToNodeStatusMap);
        //console.log(this.props.nodeIdToDatapathMap);

        this.errorDatapaths = Object.keys(this.props.errors);
        var nodes = this.getNodeTree(this.props.doc, this.props.errors);

        var tree;
        if (this.props.errors['/']) {
            tree = <H5>
                <Tooltip content={this.props.errors['/'].message} intent={Intent.DANGER}>
                    <Icon icon="error" color="red"></Icon>
                </Tooltip>
                Tree Visualization
            </H5>
        } else {
            tree = <div><H5>Tree Visualization</H5>
                <Tree contents={nodes}
                    onNodeCollapse={this.handleNodeCollapse}
                    onNodeExpand={this.handleNodeExpand}>
                </Tree></div>
        }

        return <Card elevation={Elevation.ZERO} interactive={true}>
            {tree}
        </Card>
    }

    /*
    return [{
            id: 0,
            hasCaret: true,
            icon: "code",
            label: (<Tag intent={Intent.SUCCESS} large={true} interactive={false} active={false} minimal={true}>Initialization</Tag>)
        },];

        var nodes: ITreeNode[] = [{
            id: 0,
            hasCaret: true,
            icon: "code",
            label: (<Tag intent={Intent.SUCCESS} large={true} interactive={false} active={false} minimal={true}>Initialization</Tag>),
            nodeData: {dataPath: "/Initialization"},
            isExpanded: this.state.nodesExpanded['/Initialization'],
            childNodes: [{
                id: 1,
                label: "another"
            }]
        }]
    */
}
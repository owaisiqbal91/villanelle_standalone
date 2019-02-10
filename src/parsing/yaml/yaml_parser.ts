import * as yaml from 'js-yaml';
import * as antlr_parser from '../../parsing/antlr/antlr_parser';
import * as scripting from '../../scripting';

var Ajv = require('ajv');

let reservedKeywords = ['Initialization', 'User Interaction'];

let schema = {
    "$id": "root",
    description: "Schema for villanelle yaml scripting",
    type: "object",
    required: ["Initialization", "User Interaction"],
    properties: {
        "Initialization": {
            type: "array",
            minItems: 1,
            items: {
                type: "string"
            },
            uniqueItems: true,
            errorMessage: {
                type: "Initialization should be a list of expressions (at least one)"
            }
        },
        "User Interaction": {
            type: "array",
            minItems: 1,
            items: {
                "$ref": "root#/definitions/treeNode"
            },
            uniqueItems: true
        }
    },
    additionalProperties: {
        "$ref": "root#/definitions/treeNode"
    },
    definitions: {
        userInteraction: {},
        descriptionNode: {
            type: "object",
            properties: { "description": { type: "string" } },
            additionalProperties: false,
            errorMessage: "description must be a string"
        },
        actionTextNode: {
            type: "string",
            errorMessage: "action text must be a string"
        },
        userActionObject: {
            type: "object",
            properties: {
                "user action": { "$ref": "root#/definitions/userActionNode" },
                "condition": { type: "string" }
            },
            additionalProperties: false
        },
        userActionNode: {
            type: "object",
            required: ["action text", "effect tree"],
            properties: {
                "action text": { "$ref": "root#/definitions/actionTextNode" },
                "effect tree": { "$ref": "root#/definitions/treeNode" },
            },
            additionalProperties: false,
            errorMessage: {
                required: "'user action' must have 'action text' and 'effect tree' properties"
            }
        },
        treeNode: {
            'switch': [
                {
                    if: {
                        patternRequired: ['sequence']
                    },
                    then: { "$ref": "#/definitions/sequenceNode" }
                },
                {
                    if: {
                        patternRequired: ['selector']
                    },
                    then: { "$ref": "#/definitions/selectorNode" }
                },
                {
                    if: {
                        patternRequired: ['effects']
                    }, then: { "$ref": "root#/definitions/actionNode" }
                },
                {
                    if: {
                        patternRequired: ['description']
                    }, then: { "$ref": "root#/definitions/descriptionNode" }
                },
                {
                    if: {
                        patternRequired: ['user action']
                    }, then: { "$ref": "root#/definitions/userActionObject" }
                },
                { then: false }
            ],
            errorMessage: "Must be a sequence, selector or effects keyword"
        },
        sequenceNode: {
            type: "object",
            required: ["sequence"],
            properties: {
                "sequence": { "$ref": "root#/definitions/arrayNode" },
                "condition": { type: "string" }
            },
            additionalProperties: false,
            errorMessage: {
                properties: {
                    condition: "Condition must be an expression string"
                }
            }
        },
        selectorNode: {
            type: "object",
            required: ["selector"],
            properties: {
                "selector": { "$ref": "root#/definitions/arrayNode" },
                "condition": { type: "string" }
            },
            additionalProperties: false,
            errorMessage: {
                properties: {
                    condition: "condition must be an expression string"
                }
            }
        },
        actionNode: {
            type: "object",
            required: ["effects", "ticks"],
            properties: {
                "effects": {
                    type: "array",
                    items: {
                        type: "string"
                    }
                },
                "ticks": { type: "number", minimum: 0 },
                "effect text": { type: "string" },
                "condition": { type: "string" }
            },
            additionalProperties: false,
            errorMessage: {
                properties: {
                    "ticks": 'ticks is required and should be a non-negative number',
                    "effect text": 'effect text must be a string',
                    "condition": 'condition must be an expression string',
                    "effects": 'effects should be a list of expressions'
                }
            }
        },
        arrayNode: {//sequence or selector
            type: "array",
            items: {
                "$ref": "root#/definitions/treeNode"
            },
            errorMessage: 'Must be a list'
        }
    }
};

export function parse(yamlString: string) {
    try {
        var doc = yaml.safeLoad(yamlString);
    } catch (e) {
        return [{ dataPath: "/", message: "Problem parsing YAML input" }];
    }

    var ajv = new Ajv({ allErrors: true, jsonPointers: true });
    require('ajv-keywords')(ajv, ['switch', 'patternRequired']);
    require('ajv-errors')(ajv);
    var validate = ajv.compile(schema);
    var valid = validate(doc);
    let errors = []
    if (!valid) {
        errors = validate.errors;
    }

    for (let key in doc) {
        if (!reservedKeywords.includes(key)) {
            let agent = scripting.addAgent(key);
            var tree = visitObject(doc[key], errors);
            scripting.attachTreeToAgent(agent, tree);
        }
    }

    if (doc['Initialization'] !== undefined) {
        let initializationLambda = () => visitEffects(doc['Initialization'], errors).forEach(lambda => lambda());
        if (errors.length == 0)
            initializationLambda();
    }

    if (doc['User Interaction'] !== undefined) {
        var userInteractionArr = doc['User Interaction'];
        userInteractionArr.forEach(interactionObj => scripting.addUserInteractionTree(visitObject(interactionObj, errors)));
    }

    return errors;
}

function visitObject(obj: {}, errors: any[]) {

    let condition = obj['condition'] !== undefined;
    let sequence = obj['sequence'] !== undefined;
    let selector = obj['selector'] !== undefined;
    let effects = obj['effects'] !== undefined;
    let effectsText = obj['effect text'] !== undefined;

    var conditionLambda: () => boolean = () => true;
    if (condition) {
        //get condition here
        conditionLambda = visitCondition(obj['condition'], errors);
    }

    //user interaction
    let description = obj['description'] !== undefined;
    if (description) {
        let descriptionAction = scripting.displayDescriptionAction(obj['description']);
        return condition ? scripting.guard(conditionLambda, descriptionAction) : descriptionAction;
    }
    let userAction = obj['user action'] !== undefined;
    if (userAction) {
        let userAction = visitUserAction(obj['user action'], errors);
        return condition ? scripting.guard(conditionLambda, userAction) : userAction;
    }

    var sequenceOrSelectorTick;
    if (sequence && selector) {
        //TODO add error check to see if only one of sequence, selector, effects is true
        throw new Error('Cannot have both sequence and selector as keys.')
    } else if (sequence) {
        sequenceOrSelectorTick = scripting.sequence(visitArray(obj['sequence'], errors));
    } else if (selector) {
        sequenceOrSelectorTick = scripting.selector(visitArray(obj['selector'], errors));
    }

    var effectsLambda;
    if (effects) {
        var lambdas = visitEffects(obj['effects'], errors);
        if (effectsText) {
            lambdas.push(() => scripting.displayActionEffectText(obj['effect text']));
        }
        effectsLambda = () => lambdas.forEach(lambda => lambda());
    }

    if (condition) {
        //action
        if (effects) {
            return scripting.action(conditionLambda, effectsLambda, obj['ticks']);
        } else {//guard
            return scripting.guard(conditionLambda, sequenceOrSelectorTick);
        }
    } else if (effects) { //action without condition
        return scripting.action(() => true, effectsLambda, obj['ticks']);
    } else {
        return sequenceOrSelectorTick;
    }
}

function visitArray(arr: [], errors: any[]): any[] {
    return arr.map(obj => visitObject(obj, errors));
}

function visitEffects(arr: [], errors: any[]) {
    if (arr !== null) {
        let statements = arr.join('\n');
        if (statements === '') {
            return [];
        }
        let parseResult = antlr_parser.parseEffects(statements + "\n");
        if (parseResult.errors !== undefined) {
            parseResult.errors.forEach(error => errors.push(error));
            return [];
        } else {
            return parseResult.lambdas;
        }
    } else {//no effects, no-op
        return [];
    }
}

function visitCondition(conditionExpression, errors): () => boolean {
    let parseResult = antlr_parser.parseCondition(conditionExpression + "\n");
    if (parseResult.errors !== undefined) {
        parseResult.errors.forEach(error => errors.push(error));
        return () => true;
    }
    return parseResult.lambda;
}

function visitUserAction(userActionObj, errors: any[]) {
    let actionText = userActionObj['action text'];
    let effectTree = visitObject(userActionObj['effect tree'], errors);

    return scripting.addUserActionTree(actionText, effectTree);
}
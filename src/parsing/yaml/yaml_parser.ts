import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';
import * as scripting from '../../scripting';
import * as antlr_parser from '../../parsing/antlr/antlr_parser';

let reservedKeywords = ['Initialization', 'UserInteraction'];

export function parse() {
    try {
        var doc = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, "./test.yml"), 'utf8'));
        console.log(doc);

        for (let key in doc) {
            if (!reservedKeywords.includes(key)) {
                let agent = scripting.addAgent(key);
                var tree = visitObject(doc[key]);
                scripting.attachTreeToAgent(agent, tree);
            }
        }

        if (doc['Initialization'] !== undefined) {
            let initializationLambda = visitEffects(doc['Initialization']);
            initializationLambda();
        }

        scripting.initialize();
        scripting.worldTick();

        console.log(scripting.getVariable('BellaLikesYou'));
    } catch (e) {
        console.log(e);
    }
}

function visitObject(obj: {}) {

    let condition = obj['condition'] !== undefined;
    let sequence = obj['sequence'] !== undefined;
    let selector = obj['selector'] !== undefined;
    let effects = obj['effects'] !== undefined;

    var sequenceOrSelectorTick;
    if (sequence && selector) {
        //TODO add error check to see if only one of sequence, selector, effects is true
        throw new Error('Cannot have both sequence and selector as keys.')
    } else if (sequence) {
        sequenceOrSelectorTick = scripting.sequence(visitArray(obj['sequence']));
    } else if (selector) {
        sequenceOrSelectorTick = scripting.selector(visitArray(obj['selector']));
    }

    var effectsLambda = effects ? visitEffects(obj['effects']) : null;

    if (condition) {
        //get condition here
        let conditionLambda: () => boolean = visitCondition(obj['condition']);

        //action
        if (!sequence && !selector) {
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

function visitArray(arr: []): any[] {
    return arr.map(obj => visitObject(obj));
}

function visitEffects(arr: []): () => {} {
    let statements = arr.join('\n');
    return antlr_parser.parseEffects(statements + "\n");
}

function visitCondition(conditionExpression): () => boolean {
    return antlr_parser.parseCondition(conditionExpression + "\n");
}
import * as scripting from './scripting';
import * as yamlParser from './parsing/yaml/yaml_parser';

export function initializeGame(yamlString: string) {
    scripting.reset();
    yamlParser.parse(yamlString);
    scripting.initialize();
}

export function getUIO() {
    return scripting.getUserInteractionObject();
}
import * as scripting from './scripting';
import * as yamlParser from './parsing/yaml/yaml_parser';

yamlParser.parse();
scripting.initialize();

export function getUIO() {
    return scripting.getUserInteractionObject();
}
import { Card, Code, Elevation, H5, Icon, Intent, ITreeNode, Tag, Tooltip, Tree } from '@blueprintjs/core';
import * as React from 'react';
import { node } from 'prop-types';

export class VillanelleTreeVisualizer extends React.Component<{ doc: {}, errors: {} }, { nodes: ITreeNode[] }> {

    constructor(props) {
        super(props);
        console.log(this.props.doc);
        console.log(this.props.errors);
        var nodes = this.getNodeTree(this.props.doc, this.props.errors);
        this.state = {
            nodes: nodes
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
                    isExpanded: false,
                    childNodes: []
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
                        isExpanded: true,
                        childNodes: Array.isArray(childNode) ? childNode : [childNode]
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
                    isExpanded: false,
                    childNodes: []
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

        if (obj !== null) {
            var conditionNode, nodeToBuild;
            if (obj['condition'] !== undefined) {

                if (errors[dataPath + "/condition"]) {
                    conditionNode = this.getErrorTreeNode(errors[dataPath + "/condition"].message, obj['condition']);
                    conditionNode.hasCaret = true;
                } else {
                    this.count++;
                    conditionNode = {
                        id: this.count,
                        hasCaret: true,
                        icon: "help",
                        isExpanded: true,
                        label: obj['condition'],
                        childNodes: [],
                        nodeData: { text: obj['condition'] }
                    };
                }
            }

            if (obj['sequence'] !== undefined) {
                if (errors[dataPath + '/sequence']) {
                    nodeToBuild = this.getErrorTreeNode(errors[dataPath + '/sequence'].message, 'sequence');
                } else {
                    this.count++;
                    nodeToBuild = {
                        id: this.count,
                        hasCaret: true,
                        isExpanded: true,
                        icon: "arrow-right",
                        label: "sequence",
                        childNodes: [],
                        nodeData: { text: 'sequence' }
                    };
                    nodeToBuild.childNodes = this.getArrayNode(obj['sequence'], errors, dataPath + "/sequence");
                }
            } else if (obj['selector'] !== undefined) {
                if (errors[dataPath + '/selector']) {
                    nodeToBuild = this.getErrorTreeNode(errors[dataPath + '/selector'].message, 'selector');
                } else {
                    this.count++;
                    nodeToBuild = {
                        id: this.count,
                        hasCaret: true,
                        isExpanded: true,
                        icon: "flow-branch",
                        label: "selector",
                        childNodes: [],
                        nodeData: { text: 'selector' }
                    };
                    nodeToBuild.childNodes = this.getArrayNode(obj['selector'], errors, dataPath + "/selector");
                }
            } else if (obj['effects'] !== undefined) {
                nodeToBuild = this.getEffectsNodes(obj['effects'], errors, dataPath + "/effects");
                if (conditionNode === undefined) {
                    this.count++;
                    conditionNode = {
                        id: this.count,
                        hasCaret: true,
                        icon: "help",
                        isExpanded: true,
                        label: "true",
                        childNodes: [],
                        nodeData: { text: 'true' }
                    };
                }

                if (obj['effect text'] !== undefined) {
                    if (errors[dataPath + '/effect text']) {
                        nodeToBuild.push(this.getErrorTreeNode(errors[dataPath + '/effect text'].message, obj['effect text'] + ''));
                    } else {
                        this.count++;
                        nodeToBuild.push({
                            id: this.count,
                            hasCaret: false,
                            icon: "comment",
                            label: <Tooltip content="effect text"><i>{'"' + obj['effect text'] + '"'}</i></Tooltip>,
                            nodeData: { text: <i>{obj['effect text']}</i> }
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
                    nodeToBuild = {
                        id: this.count,
                        hasCaret: false,
                        icon: "paragraph",
                        label: <Tooltip content="description"><i>{'"' + obj['description'] + '"'}</i></Tooltip>,
                        nodeData: { text: <i>{obj['description']}</i> }
                    };
                }
            } else if (obj['user action'] !== undefined) {
                if (errors[dataPath + '/user action']) {
                    nodeToBuild = this.getErrorTreeNode(errors[dataPath + '/user action'], 'user action');
                } else {
                    this.count++;
                    nodeToBuild = {
                        id: this.count,
                        hasCaret: true,
                        icon: "select",
                        label: "user action",
                        childNodes: [],
                        nodeData: { text: "user action" }
                    }
                    if (obj['user action']['action text'] !== undefined) {
                        if (errors[dataPath + '/user action/action text']) {
                            nodeToBuild.childNodes.push(this.getErrorTreeNode(errors[dataPath + '/user action/action text'].message, obj['user action']['action text'] + ''));
                        } else {
                            this.count++;
                            nodeToBuild.childNodes.push({
                                id: this.count,
                                hasCaret: false,
                                icon: "font",
                                label: <b>{'"' + obj['user action']['action text'] + '"'}</b>,
                                nodeData: { text: <b>{obj['user action']['action text']}</b> }
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
                                nodeData: { text: "effect tree" }
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
                    return errorForObject ? this.makeErrorTreeNodeForExistingNode(conditionNode, errorForObject) : conditionNode;
                } else return errorForObject ? this.makeErrorTreeNodeForExistingNode(nodeToBuild, errorForObject) : nodeToBuild;
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

    getEffectsNodes(effects: string[], errors, dataPath) {
        return effects.map((effect, index) => {
            if (errors[dataPath + '/' + index]) {
                return this.getErrorTreeNode(errors[dataPath + '/' + index].message, effect + "");
            } else {
                this.count++;
                return {
                    id: this.count,
                    hasCaret: false,
                    label: <Code>{effect}</Code>,
                    icon: "code",
                    nodeData: { text: <Code>{effect}</Code> }
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
        }
    }

    private handleNodeCollapse = (nodeData: ITreeNode) => {
        nodeData.isExpanded = false;
        this.setState(this.state);
    };

    private handleNodeExpand = (nodeData: ITreeNode) => {
        nodeData.isExpanded = true;
        this.setState(this.state);
    };

    render() {
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
                <Tree contents={this.state.nodes}
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
    */
}
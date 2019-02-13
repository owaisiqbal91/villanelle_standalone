import { Drawer, Code, Icon, ITreeNode, Tree, Overlay, Classes, Elevation, Card, Tooltip } from '@blueprintjs/core';
import * as React from 'react';

export class VillanelleTreeVisualizer extends React.Component<{ doc: {}, errors: any[] }, { nodes: ITreeNode[] }> {

    constructor(props) {
        super(props);
        var nodes = this.getNodeTree(props.doc, props.errors);
        this.state = {
            nodes: nodes
        }
    }

    count = 0;
    getNodeTree(doc, errors): ITreeNode[] {
        let reservedKeywords = ['Initialization', 'User Interaction'];

        //TODO check root level error here
        var treeNodes = [];
        if (doc['Initialization'] !== undefined) {
            this.count++;
            var initializationNode = {
                id: this.count,
                hasCaret: true,
                icon: "code-block",
                label: "Initialization",
                isExpanded: false,
                childNodes: []
            }
            var initializationChildNodes = this.getEffectsNodes(doc['Initialization'], errors);
            initializationNode.childNodes = initializationChildNodes;
            treeNodes.push(initializationNode);
        }

        for (let key in doc) {
            if (!reservedKeywords.includes(key)) {
                var childNode = this.getObjectNode(doc[key], errors);
                this.count++;
                var agentNode = {
                    id: this.count,
                    hasCaret: true,
                    icon: "person",
                    label: key,
                    isExpanded: false,
                    childNodes: Array.isArray(childNode) ? childNode : [childNode]
                }
                treeNodes.push(agentNode);
            }
        }

        if (doc['User Interaction'] !== undefined) {
            this.count++;
            var userInteractionNode = {
                id: this.count,
                hasCaret: true,
                icon: "social-media",
                label: "User Interaction",
                isExpanded: true,
                childNodes: []
            }
            var interactionChildNodes = this.getArrayNode(doc['User Interaction'], errors);
            userInteractionNode.childNodes = interactionChildNodes;
            treeNodes.push(userInteractionNode);
        }

        console.log(treeNodes);
        this.count = 0;
        return treeNodes;
    }

    getObjectNode(obj, errors) {
        var conditionNode, nodeToBuild;
        if (obj['condition'] !== undefined) {
            this.count++;
            conditionNode = {
                id: this.count,
                hasCaret: true,
                icon: "help",
                isExpanded: true,
                label: obj['condition'],
                childNodes: [],
            };
        }

        if (obj['sequence'] !== undefined) {
            this.count++;
            nodeToBuild = {
                id: this.count,
                hasCaret: true,
                isExpanded: true,
                icon: "arrow-right",
                label: "sequence",
                childNodes: []
            };
            nodeToBuild.childNodes = this.getArrayNode(obj['sequence'], errors);
        } else if (obj['selector'] !== undefined) {
            this.count++;
            nodeToBuild = {
                id: this.count,
                hasCaret: true,
                isExpanded: true,
                icon: "flow-branch",
                label: "selector",
                childNodes: []
            };
            nodeToBuild.childNodes = this.getArrayNode(obj['selector'], errors);
        } else if (obj['effects'] !== undefined) {
            nodeToBuild = this.getEffectsNodes(obj['effects'], errors);
            if (conditionNode === undefined) {
                this.count++;
                conditionNode = {
                    id: this.count,
                    hasCaret: true,
                    icon: "help",
                    isExpanded: true,
                    label: "true",
                    childNodes: [],
                };
            }

            if (obj['effect text'] !== undefined) {
                this.count++;
                nodeToBuild.push({
                    id: this.count,
                    hasCaret: false,
                    icon: "comment",
                    label: <Tooltip content="effect text"><i>{'"' + obj['effect text'] + '"'}</i></Tooltip>
                });
            }

            if (obj['ticks'] !== undefined) {
                let tickLabel = (<div><Icon icon="time" /> {obj['ticks']}</div>);
                if (conditionNode !== undefined) {
                    conditionNode.secondaryLabel = tickLabel;
                } else { //attach to first effects statement
                    nodeToBuild[0].secondaryLabel = tickLabel;
                }
            }
        } else if (obj['description'] !== undefined) {
            this.count++;
            nodeToBuild = {
                id: this.count,
                hasCaret: false,
                icon: "paragraph",
                label: <Tooltip content="description"><i>{'"' + obj['description'] + '"'}</i></Tooltip>
            };
        } else if (obj['user action'] !== undefined) {
            this.count++;
            nodeToBuild = {
                id: this.count,
                hasCaret: true,
                icon: "select",
                label: "user action",
                childNodes: []
            }
            if (obj['user action']['action text'] !== undefined) {
                this.count++;
                nodeToBuild.childNodes.push({
                    id: this.count,
                    hasCaret: false,
                    icon: "font",
                    label: <b>{'"' + obj['user action']['action text'] + '"'}</b>,
                })
            }
            if (obj['user action']['effect tree'] !== undefined){
                this.count++;
                var effectTreeNode = {
                    id: this.count,
                    hasCaret: true,
                    icon: "tree",
                    label: "effect tree",
                    childNodes: []
                };
                let effectTreeChildNodes = this.getObjectNode(obj['user action']['effect tree'], errors);
                effectTreeNode.childNodes = Array.isArray(effectTreeChildNodes) ? effectTreeChildNodes : [effectTreeChildNodes];
                nodeToBuild.childNodes.push(effectTreeNode);
            }
        }

        if (conditionNode !== undefined) {
            conditionNode.childNodes = Array.isArray(nodeToBuild) ? nodeToBuild : [nodeToBuild];
            return conditionNode;
        } else return nodeToBuild;
    }

    getArrayNode(arr, errors) {
        return arr.map(obj => this.getObjectNode(obj, errors));
    }

    getEffectsNodes(effects: string[], errors) {
        return effects.map(effect => {
            this.count++;
            return {
                id: this.count,
                hasCaret: false,
                label: <Code>{effect}</Code>,
                icon: "code"
            }
        });
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
        //  return <Drawer portalClassName={Classes.OVERLAY_SCROLL_CONTAINER} size={Drawer.SIZE_LARGE} icon="eye-open" title="Visualized Script" isOpen={true}>
        return <Overlay className={Classes.OVERLAY_SCROLL_CONTAINER}
            isOpen={true} hasBackdrop={true} usePortal={true}>
            <Card elevation={Elevation.FOUR}>
                <Tree contents={this.state.nodes}
                    onNodeCollapse={this.handleNodeCollapse}
                    onNodeExpand={this.handleNodeExpand}>
                </Tree>
            </Card>
        </Overlay>
        // </Drawer>;
    }
    /*
    return [{
            id: 0,
            hasCaret: true,
            icon: "code",
            label: (<Tag intent={Intent.SUCCESS} large={true} interactive={false} active={false} minimal={true}>Initialization</Tag>)
        }, {
            id: 1,
            hasCaret: true,
            icon: "person",
            label: "Bella"
        }, {
            id: 2,
            hasCaret: true,
            icon: "social-media",
            label: "User Interaction"
        }];
    */
}
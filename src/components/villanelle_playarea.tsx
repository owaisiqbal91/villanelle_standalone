import { Button, ButtonGroup, Callout, Card, ControlGroup, Divider, NonIdealState, Text, H3, H6, H4 } from '@blueprintjs/core';
import * as React from 'react';
import { executeUserAction, worldTick, getNodeIdStatusMap, getVariable, getUserInteractionObject, getAllVariables } from '../scripting';

export class VillanellePlayArea extends React.Component<{ hasErrors: boolean, uio: any, handler: ({ }) => void }, {}> {

    constructor(props) {
        super(props);
        this.actionTaken = this.actionTaken.bind(this);

        this.props.handler(getNodeIdStatusMap());
    }

    public actionTaken(index: number) {
        var selectedAction = this.props.uio.userActionsText[index];
        if (selectedAction !== undefined) {
            executeUserAction(selectedAction);
            let uio = worldTick();
            this.props.handler(getNodeIdStatusMap());
            this.setState({ uio: uio });
        }
        console.log("All variables: ");
        console.log(getAllVariables());
    }

    public doMove(actionText: string) {
        executeUserAction(actionText);
        worldTick();
        this.props.handler(getNodeIdStatusMap());
    }

    public render() {

        if (!this.props.hasErrors) {
            let actionButtons = [];
            for (let index = 0; index < this.props.uio.userActionsText.length; index++) {
                actionButtons.push(
                    <Button key={index} small={true} onClick={() => this.actionTaken(index)}>
                        {this.props.uio.userActionsText[index]}
                    </Button>);
            }

            var descriptionText = this.props.uio.text.split("\n").map(part => <div key={part}>{part}<br /></div>);
            var actionEffectsText = this.props.uio.actionEffectsText.split("\n").map(part => <div key={part}>{part}<br /></div>);
            var textToDisplay = this.props.uio.actionEffectsText.length != 0 ? actionEffectsText : descriptionText;

            var title = getVariable("title") === undefined ? "Game title (use variable 'title')" : getVariable("title")
            var scene = getVariable("scene") === undefined ? <b>Scene title (use variable 'scene')</b> : <b>{getVariable("scene")}</b>
            return (
                <ControlGroup vertical={true} fill={true}>
                    <Card elevation={4}>
                        <Callout title={title}>
                            {/* <H4>{scene}</H4> */}
                            {scene}
                            <Text>{textToDisplay}</Text>
                        </Callout>
                    </Card>
                    <Divider />
                    <Card elevation={4}>
                        <ButtonGroup vertical={true} fill={true}>
                            {actionButtons}
                        </ButtonGroup>

                    </Card>
                </ControlGroup >
            );
        }
        return <NonIdealState icon="error" title="Compilation failed!"
            description="You have one or more error(s) in your script." />
    }
}
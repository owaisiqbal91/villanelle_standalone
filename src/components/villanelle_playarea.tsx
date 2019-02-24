import { Button, ButtonGroup, Callout, Card, ControlGroup, Divider, NonIdealState } from '@blueprintjs/core';
import * as React from 'react';
import { executeUserAction, worldTick, getNodeIdStatusMap } from '../scripting';

export class VillanellePlayArea extends React.Component<{ hasErrors: boolean, uio: any, handler: ({}) => void }, {}> {

    constructor(props) {
        super(props);
        console.log("play area constructed");
        this.actionTaken = this.actionTaken.bind(this);
    }

    public actionTaken(index: number) {
        var selectedAction = this.props.uio.userActionsText[index];
        if (selectedAction !== undefined) {
            executeUserAction(selectedAction);
            let uio = worldTick();
            this.props.handler(getNodeIdStatusMap());
            this.setState({ uio: uio });
        }
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

            var textToDisplay = this.props.uio.actionEffectsText.length != 0 ? this.props.uio.actionEffectsText : this.props.uio.text;

            return (
                <ControlGroup vertical={true} fill={true}>
                    <Card elevation={4}>
                        <Callout title='Monster Prom'>
                            {textToDisplay}
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
        description="You have one or more error(s) in your script."/>
    }
}
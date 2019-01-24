import { Button, ButtonGroup, Callout, Card, ControlGroup, Divider, Intent } from '@blueprintjs/core';
import * as React from 'react';
import { getUIO } from '../game';
import {executeUserAction, worldTick} from '../scripting';

export class VillanellePlayArea extends React.Component<{}, { uio: any }> {

    constructor(props) {
        super(props);

        let uio = getUIO();
        this.state = {
            uio: uio
        };

        this.actionTaken = this.actionTaken.bind(this);
    }

    public actionTaken(index: number) {
        var selectedAction = this.state.uio.userActionsText[index];
        if (selectedAction !== undefined) {
            executeUserAction(selectedAction);
            worldTick();
            let uio = getUIO();
            this.setState({uio: uio});
        }
    }

    public render() {

        let actionButtons = [];
        for (let index = 0; index < this.state.uio.userActionsText.length; index++) {
            actionButtons.push(
                <Button key={index} small={true} onClick={() => this.actionTaken(index)}>
                    {this.state.uio.userActionsText[index]}
                </Button>);
        }

        var textToDisplay = this.state.uio.actionEffectsText.length != 0 ? this.state.uio.actionEffectsText : this.state.uio.text;

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
}
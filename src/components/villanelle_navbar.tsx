import { Alignment, Button, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading } from '@blueprintjs/core';
import { ipcRenderer } from 'electron';
import * as React from 'react';

export class VillanelleNavbar extends React.PureComponent<{handler: (string) => void, currentTab: string}> {

    public render() {

        return (
            <Navbar>
                <NavbarGroup align={Alignment.LEFT}>
                    <NavbarHeading>Villanelle</NavbarHeading>
                    <NavbarDivider />
                    <Button className={Classes.MINIMAL} icon='code' text='Script' active={this.props.currentTab === 'Script'} onClick={() => {
                        this.props.handler('Script');
                        }} />
                    <Button className={Classes.MINIMAL} icon='citation' text='Play' active={this.props.currentTab === 'Play'} onClick={() => {
                        this.props.handler('Play');
                        }} />
                </NavbarGroup>
                <NavbarGroup align={Alignment.RIGHT}>
                    <Button className={Classes.MINIMAL} icon='power' text='Exit' onClick={() => ipcRenderer.send('closed')} />
                </NavbarGroup>
            </Navbar>
        );
    }
}
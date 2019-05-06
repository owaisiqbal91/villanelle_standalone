import { Alignment, Button, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading, ButtonGroup } from '@blueprintjs/core';
import { ipcRenderer } from 'electron';
import * as React from 'react';

export class VillanelleNavbar extends React.PureComponent<{
    handler: (string) => void,
    currentTab: string,
    fixToTop: boolean,
    saveHandler: () => void,
    saveAsHandler: () => void,
    openHandler: () => void,
    currentFile: string,
    unsaved: boolean,
    reloadGameHandler: () => void
}> {

    public render() {

        var fileNameText = this.props.unsaved ? "Save " + this.props.currentFile + "*" : this.props.currentFile;

        return (
            <Navbar fixedToTop={true}/* fixedToTop={this.props.fixToTop} */>
                <NavbarGroup align={Alignment.LEFT}>
                    <NavbarHeading>Villanelle</NavbarHeading>
                    <NavbarDivider />
                    <Button className={Classes.MINIMAL} icon='code' text='Script' active={this.props.currentTab === 'Script'} onClick={() => {
                        this.props.handler('Script');
                    }} />
                    <NavbarDivider />
                    <ButtonGroup>
                        <Button className={Classes.MINIMAL} icon='citation' text='Play' active={this.props.currentTab === 'Play'} onClick={() => {
                            this.props.handler('Play');
                        }} />
                        <Button className={Classes.MINIMAL} icon='refresh' text='Reload' onClick={() => {
                            this.props.reloadGameHandler();
                        }} />
                    </ButtonGroup>
                </NavbarGroup>
                <NavbarGroup align={Alignment.RIGHT}>
                    <Button className={Classes.MINIMAL} text={fileNameText} active={false} onClick={() => {
                        this.props.saveHandler();
                    }} />
                    <Button className={Classes.MINIMAL} icon='floppy-disk' text='Save as..' active={false} onClick={() => {
                        this.props.saveAsHandler();
                    }} />
                    <Button className={Classes.MINIMAL} icon='document-open' text='Open' active={false} onClick={() => {
                        this.props.openHandler();
                    }} />
                    <Button className={Classes.MINIMAL} icon='power' text='Exit' onClick={() => {
                        var close = true;
                        if (this.props.unsaved) {
                            if (confirm("You have unsaved changes. Do you still want to quit?"))
                                close = true
                            else close = false
                        }
                        if (close)
                            ipcRenderer.send('closed')
                    }} />
                </NavbarGroup>
            </Navbar>
        );
    }
}
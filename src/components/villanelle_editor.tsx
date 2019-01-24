import { EditableText } from '@blueprintjs/core';
import * as React from 'react';

export class VillanelleEditor extends React.PureComponent<{}, {value: string}> {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Villanelle script goes here'
        };
        this.handleChange = this.handleChange.bind(this);
        this.checkIfTabPressed = this.checkIfTabPressed.bind(this);
        this.compile = this.compile.bind(this);
    }

    handleChange(event) {
        //do something
    }

    compile(event) {
        console.log('Compiled');
    }

    checkIfTabPressed(event) {
        /*
            if(event.keyCode===9)
                {var v=this.value,s=this.selectionStart,e=this.selectionEnd;
                    this.value=v.substring(0, s)+'    '+v.substring(e);
                    this.selectionStart=this.selectionEnd=s+1;return false;}
        */
        if (event.keyCode === 81) {
            console.log('Tab');
        }
    }

    render() {
        return (
            <EditableText
                /* large={true}
                onChange={this.handleChange}
                defaultValue={this.state.value}
                fill={true}
                style={styleProp} */
                multiline={true}
                defaultValue={this.state.value}
                onEdit={this.handleChange}
                minLines={5}
                onConfirm={this.compile}
            />
        );
    }
}
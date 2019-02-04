import * as React from 'react';
import AceEditor from 'react-ace';

require("brace/mode/yaml");
require("brace/theme/mono_industrial");

export class VillanelleAceEditor extends React.Component<{code: string, handler: (string) => void}> {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(newValue) {
        this.props.handler(newValue);
    }

    render() {
        return <AceEditor
            mode="yaml"
            theme="mono_industrial"
            fontSize = { 20 }
            width = { "100%" }
            onChange={this.onChange}
            onLoad={(editor: any) => {
                editor.focus();
                editor.getSession().setUseWrapMode(true);
            }}
            name="villanelle_ace_editor"
            value={this.props.code}
            editorProps={{ $blockScrolling: true }}
        />
    }
}
import { Callout, Intent } from '@blueprintjs/core';
import * as fs from 'fs';
import * as path from 'path';
import * as React from 'react';
import * as yamlParser from '../parsing/yaml/yaml_parser';
import * as scripting from '../scripting';
import { VillanelleAceEditor } from './villanelle_ace_editor';
import { VillanelleNavbar } from './villanelle_navbar';
import { VillanellePlayArea } from './villanelle_playarea';
import { VillanelleTreeVisualizer } from './villanelle_tree_visualizer';

export class App extends React.Component<{}, { currentTab: string, code: string, errors: any[], doc: {} }> {
  constructor(props) {
    super(props);
    var yamlString = fs.readFileSync(path.resolve(__dirname, "../parsing/yaml/test.yml"), 'utf8');
    var parsedObject = this.initializeGame(yamlString);
    this.state = {
      currentTab: 'Script',
      code: yamlString,
      errors: parsedObject.errors,
      doc: parsedObject.doc
    };

    this.setCurrentTab = this.setCurrentTab.bind(this);
    this.setCode = this.setCode.bind(this);
  }

  public setCurrentTab(currentTab) {
    this.setState({ currentTab: currentTab });
  }

  public setCode(code) {
    var parsedObject = this.initializeGame(code);
    this.setState({ code: code, errors: parsedObject.errors, doc: parsedObject.doc });
  }

  initializeGame(yamlString) {
    scripting.reset();
    let parsedObject = yamlParser.parse(yamlString);
    let errors = parsedObject.errors;
    let doc = parsedObject.doc;

    if (errors.length == 0) {
      scripting.initialize();
    }
    return {doc: doc, errors: errors};
  }

  getCallout() {
    if (this.state.errors.length != 0) {
      let errorsList = <ul>
        {this.state.errors.map(function (error: { message: string }, index) {
          return <li key={index}>{error.message}</li>
        })}
      </ul>;
      let title = "Compilation: " + this.state.errors.length + " error(s)";
      return <Callout title={title} intent={Intent.DANGER}>
        {errorsList}
      </Callout>;
    } else {
      return <Callout title="Compilation" intent={Intent.SUCCESS}>
        Successful!
      </Callout>;
    }
  }

  render() {

    let mainPage;

    if (this.state.currentTab === 'Script') {
      let compilationResult = this.getCallout();

      mainPage = <div>
        <VillanelleAceEditor handler={this.setCode} code={this.state.code} />
        {compilationResult}
        <VillanelleTreeVisualizer doc={this.state.doc} errors={this.state.errors}/>
      </div>;
    } else if (this.state.currentTab === 'Play') {
      let uio = scripting.getUserInteractionObject();
      mainPage = <VillanellePlayArea hasErrors={this.state.errors.length != 0} uio={uio} />;
    }

    return (
      <div>
        <VillanelleNavbar handler={this.setCurrentTab} currentTab={this.state.currentTab} />
        {mainPage}
      </div>
    );
  }
}

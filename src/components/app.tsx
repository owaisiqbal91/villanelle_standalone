import { Callout, Intent, Navbar, Divider, H5, Elevation, Card, H3 } from '@blueprintjs/core';
import * as fs from 'fs';
import * as path from 'path';
import * as React from 'react';
import * as yamlParser from '../parsing/yaml/yaml_parser';
import * as scripting from '../scripting';
import { VillanelleAceEditor } from './villanelle_ace_editor';
import { VillanelleNavbar } from './villanelle_navbar';
import { VillanellePlayArea } from './villanelle_playarea';
import { VillanelleTreeVisualizer } from './villanelle_tree_visualizer';
import { Mosaic, MosaicWindow } from 'react-mosaic-component';
import { number } from 'prop-types';
import { Rnd } from "react-rnd";
import { windowWidth, windowHeight } from '../constants';

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
    return { doc: doc, errors: errors };
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

      /* mainPage = <div>
        <VillanelleAceEditor handler={this.setCode} code={this.state.code} />
        {compilationResult}
        <VillanelleTreeVisualizer doc={this.state.doc} errors={this.state.errors}/>
      </div>; */
      var layout = [
        { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
        { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
        { i: 'c', x: 4, y: 0, w: 1, h: 2 }
      ];
      mainPage = <div>
        <Rnd
          default={{
            x: 0,
            y: 0,
            width: windowWidth / 2,
            height: windowHeight,
          }}
          disableDragging={true}
        >
        <VillanelleAceEditor handler={this.setCode} code={this.state.code} />
        {compilationResult}
        </Rnd>
        <Rnd
          default={{
            x: windowWidth / 2,
            y: 0,
            width: windowWidth / 2,
            height: 500,
          }}
          disableDragging={true}
        >
          <VillanelleTreeVisualizer doc={this.state.doc} errors={this.state.errors} />
        </Rnd>
      </div>
    } else if (this.state.currentTab === 'Play') {
      let uio = scripting.getUserInteractionObject();
      mainPage = <VillanellePlayArea hasErrors={this.state.errors.length != 0} uio={uio} />;
    }

    return (
      <div>
        <VillanelleNavbar handler={this.setCurrentTab} currentTab={this.state.currentTab} fixToTop={this.state.currentTab === 'Script'}/>
        {mainPage}
      </div>
    );
  }
}

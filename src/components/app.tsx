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

var electron = require('electron');

export class App extends React.Component<{}, { currentTab: string, code: string, errors: {}, doc: {} }> {
  constructor(props) {
    super(props);
    var yamlString = fs.readFileSync(path.resolve(__dirname, "../parsing/yaml/test_error.yml"), 'utf8');
    var parsedObject = this.initializeGame(yamlString);
    this.state = {
      currentTab: 'Script',
      code: yamlString,
      errors: this.getErrorsByDataPath(parsedObject.errors),
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
    this.setState({ code: code, errors: this.getErrorsByDataPath(parsedObject.errors), doc: parsedObject.doc });
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
    var errorDatapaths = Object.keys(this.state.errors);
    var errors = this.state.errors;
    if (errorDatapaths.length != 0) {
      let errorsList = <ul>
        {errorDatapaths.map(function (errorDatapath, index) {
          return <li key={index}>{errors[errorDatapath].message}</li>
        })}
      </ul>;
      let title = "Compilation: " + errorDatapaths.length + " error(s)";
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
      var screen = electron.screen.getPrimaryDisplay();
      let windowWidth = screen.size.width;
      let windowHeight = screen.size.height;
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
          <VillanelleAceEditor handler={this.setCode} code={this.state.code} height={windowHeight - 200} />
          {compilationResult}
        </Rnd>
        <Rnd
          default={{
            x: windowWidth / 2,
            y: 0,
            width: windowWidth / 2,
            height: windowHeight,
          }}
          disableDragging={true}
        >
          <VillanelleTreeVisualizer key={this.state.code} doc={this.state.doc} errors={this.state.errors} />
        </Rnd>
      </div>
    } else if (this.state.currentTab === 'Play') {
      let uio = scripting.getUserInteractionObject();
      mainPage = <VillanellePlayArea hasErrors={Object.keys(this.state.errors).length != 0} uio={uio} />;
    }

    return (
      <div>
        <VillanelleNavbar handler={this.setCurrentTab} currentTab={this.state.currentTab} fixToTop={this.state.currentTab === 'Script'} />
        {mainPage}
      </div>
    );
  }

  getErrorsByDataPath(errors) {
    var errorsByDataPath = {};
    errors.forEach(error => {
      var path = error.dataPath ? error.dataPath : "/";
      errorsByDataPath[path] = error;
    });

    return errorsByDataPath;
  }
}

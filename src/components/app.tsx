import { Callout, Intent } from '@blueprintjs/core';
import * as fs from 'fs';
import * as path from 'path';
import * as React from 'react';
import { Rnd } from "react-rnd";
import * as yamlParser from '../parsing/yaml/yaml_parser';
import * as scripting from '../scripting';
import { VillanelleAceEditor } from './villanelle_ace_editor';
import { VillanelleNavbar } from './villanelle_navbar';
import { VillanellePlayArea } from './villanelle_playarea';
import { VillanelleTreeVisualizer } from './villanelle_tree_visualizer';

var electron = require('electron');

export class App extends React.Component<{}, { currentTab: string, code: string, errors: {}, doc: {}, nodeIdToDatapathMap: {}, nodeIdStatusMap: {}}> {
  constructor(props) {
    super(props);
    var yamlString = fs.readFileSync(path.resolve(__dirname, "../parsing/yaml/weird_city_interloper.yml"), 'utf8');
    var initializedObject = this.initializeGame(yamlString);
    this.state = {
      currentTab: 'Play',
      code: yamlString,
      errors: this.getErrorsByDataPath(initializedObject.errors),
      doc: initializedObject.doc,
      nodeIdToDatapathMap: initializedObject.nodeIdToDatapathMap,
      nodeIdStatusMap: initializedObject.nodeIdStatusMap
    };

    this.setCurrentTab = this.setCurrentTab.bind(this);
    this.setCode = this.setCode.bind(this);
    this.setNodeIdStatusMap = this.setNodeIdStatusMap.bind(this);
  }

  public setCurrentTab(currentTab) {
    this.setState({ currentTab: currentTab });
  }

  public setCode(code) {
    var initializedObject = this.initializeGame(code);
    this.setState({
      code: code,
      errors: this.getErrorsByDataPath(initializedObject.errors),
      doc: initializedObject.doc,
      nodeIdToDatapathMap: initializedObject.nodeIdToDatapathMap,
      nodeIdStatusMap: initializedObject.nodeIdStatusMap
    });
  }

  public setNodeIdStatusMap(nodeIdStatusMap) {
    this.setState({
      nodeIdStatusMap: nodeIdStatusMap
    });
  }

  initializeGame(yamlString) {
    scripting.reset();
    let parsedObject = yamlParser.parse(yamlString);
    let errors = parsedObject.errors;
    let doc = parsedObject.doc;
    let nodeIdToDatapathMap = parsedObject.nodeIdToDatapathMap;
    let nodeIdStatusMap = scripting.getNodeIdStatusMap();

    if (errors.length == 0) {
      scripting.initialize();
    }
    return { doc: doc, errors: errors, nodeIdToDatapathMap: nodeIdToDatapathMap, nodeIdStatusMap: nodeIdStatusMap };
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
    var screen = electron.screen.getPrimaryDisplay();
    let windowWidth = screen.size.width;
    let windowHeight = screen.size.height;

    if (this.state.currentTab === 'Script') {
      let compilationResult = this.getCallout();

      let aceEditorPanel = <div>
        <VillanelleAceEditor handler={this.setCode} code={this.state.code} height={windowHeight - 200} />
        {compilationResult}
      </div>;
      let treeVisualizerPanel = <VillanelleTreeVisualizer
        doc={this.state.doc}
        errors={this.state.errors}
        showDebugState={false} />

      mainPage = this.getSplitPane(windowWidth, windowHeight, aceEditorPanel, treeVisualizerPanel);

    } else if (this.state.currentTab === 'Play') {

      let uio = scripting.getUserInteractionObject();
      let hasErrors = Object.keys(this.state.errors).length != 0;
      if (hasErrors) {
        mainPage = <VillanellePlayArea hasErrors={true} uio={uio} handler={this.setNodeIdStatusMap}/>;
      } else {
        let playAreaPanel = <VillanellePlayArea hasErrors={false} uio={uio} handler={this.setNodeIdStatusMap}/>;
        let treeVisualizerPanel = <VillanelleTreeVisualizer
          doc={this.state.doc}
          errors={this.state.errors}
          showDebugState={true}
          nodeIdToDatapathMap={this.state.nodeIdToDatapathMap}
          nodeIdStatusMap={this.state.nodeIdStatusMap} />

        mainPage = this.getSplitPane(windowWidth, windowHeight, playAreaPanel, treeVisualizerPanel);
      }
    }

    return (
      <div>
        <VillanelleNavbar handler={this.setCurrentTab} currentTab={this.state.currentTab} fixToTop={this.state.currentTab === 'Script'} />
        {mainPage}
      </div>
    );
  }

  getSplitPane(windowWidth, windowHeight, leftPaneElement, rightPaneElement) {
    return <div>
      <Rnd
        default={{
          x: 0,
          y: 0,
          width: windowWidth / 2,
          height: windowHeight,
        }}
        disableDragging={true}
      >
        {leftPaneElement}
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
        {rightPaneElement}
      </Rnd>
    </div>
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

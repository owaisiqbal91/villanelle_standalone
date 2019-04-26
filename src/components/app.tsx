import { Callout, Intent, Divider } from '@blueprintjs/core';
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
import { ipcRenderer } from 'electron';

var electron = require('electron');

var remote = require('electron').remote;
var dialog = remote.dialog;

var Mousetrap = require('mousetrap');

export class App extends React.Component<{}, {
  currentTab: string,
  code: string,
  errors: {},
  doc: {},
  nodeIdToDatapathMap: {},
  nodeIdStatusMap: {},
  rootNodeDatapaths: string[],
  currentFile: string
  fileOpened: boolean,
  unsaved: boolean
}> {
  constructor(props) {
    super(props);
    //var yamlString = fs.readFileSync(path.resolve(__dirname, "../parsing/yaml/weird_city_interloper.yml"), 'utf8');
    var yamlString = '';
    var initializedObject = this.initializeGame(yamlString);
    this.state = {
      currentTab: 'Script',
      code: yamlString,
      errors: this.getErrorsByDataPath(initializedObject.errors),
      doc: initializedObject.doc,
      nodeIdToDatapathMap: initializedObject.nodeIdToDatapathMap,
      nodeIdStatusMap: initializedObject.nodeIdStatusMap,
      rootNodeDatapaths: initializedObject.rootNodeDatapaths,
      currentFile: "[New file]",
      fileOpened: false,
      unsaved: false
    };

    this.setCurrentTab = this.setCurrentTab.bind(this);
    this.setCode = this.setCode.bind(this);
    this.setNodeIdStatusMap = this.setNodeIdStatusMap.bind(this);
    this.saveFile = this.saveFile.bind(this);
    this.saveAsFile = this.saveAsFile.bind(this);
    this.openFile = this.openFile.bind(this);

    // Mousetrap.bind(['command+r', 'ctrl+r', 'f5'], function () {
    //   ipcRenderer.send('reload')
    // })
    Mousetrap.bind(['command+i', 'ctrl+i', 'command+shift+i', 'ctrl+shift+i'], function () {
      ipcRenderer.send('toggleDevTools')
    })
    Mousetrap.bind(['command+w', 'ctrl+w'], function () {
      ipcRenderer.send('closed')
    })
    Mousetrap.bind(['command+s', 'ctrl+s'], this.saveFile)
    Mousetrap.bind(['command+shift+s', 'ctrl+shift+s'], this.saveAsFile)
    Mousetrap.bind(['command+o', 'ctrl+o'], this.openFile)
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
      nodeIdStatusMap: initializedObject.nodeIdStatusMap,
      rootNodeDatapaths: initializedObject.rootNodeDatapaths,
      unsaved: true
    });
  }

  public saveFile() {
    if (!this.state.fileOpened) {
      return this.saveAsFile();
    }

    fs.writeFile(this.state.currentFile, this.state.code, (err) => {
      if (err) {
        alert(err);
        console.log(err);
        return;
      }
      this.setState({ unsaved: false });
    })
  }

  public saveAsFile() {
    dialog.showSaveDialog(null, {}, (filepath) => {
      if (filepath === undefined) {
        alert("You didn't save the file");
        return;
      }

      if (!filepath.endsWith(".yml")) {
        filepath += ".yml"
      }

      fs.writeFile(filepath, this.state.code, (err) => {
        if (err) {
          alert(err);
          console.log(err);
          return;
        }
        alert("Saved successfully!");
        this.setState({ currentFile: path.basename(filepath), fileOpened: true, unsaved: false });
      })
    })
  }

  public openFile() {
    dialog.showOpenDialog(null, {
      filters: [{ name: 'YAML files', extensions: ['yml'] }]
    }, (filePaths) => {
      if (filePaths === undefined || filePaths.length == 0) {
        return;
      }
      var filePath = filePaths[0];
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          alert(err);
          console.log(err);
          return;
        }

        this.setCode(data);
        this.setState({ currentFile: path.basename(filePath), fileOpened: true, unsaved: false });
      });
    })
  }

  dataPathToNodeStatusMap = {}
  dataPathToNodeIdMap = {}
  public setNodeIdStatusMap(nodeIdStatusMap) {
    this.setState({
      nodeIdStatusMap: nodeIdStatusMap
    });
    Object.keys(this.state.nodeIdToDatapathMap).forEach(key => {
      this.dataPathToNodeStatusMap[this.state.nodeIdToDatapathMap[key]] = nodeIdStatusMap[key];
      this.dataPathToNodeIdMap[this.state.nodeIdToDatapathMap[key]] = key;
    });

    //reset statuses
    this.state.rootNodeDatapaths.forEach(rootNodeDatapath => {
      let status: scripting.Status = this.dataPathToNodeStatusMap[rootNodeDatapath];
      if (status == scripting.Status.SUCCESS || status == scripting.Status.FAILURE) {
        //clear node status for child nodes
        Object.keys(this.dataPathToNodeIdMap).forEach(dataPath => {
          if (dataPath.startsWith(rootNodeDatapath)) {
            scripting.clearNodeStatus(this.dataPathToNodeIdMap[dataPath]);
          }
        })
      }
    })
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
    return {
      doc: doc,
      errors: errors,
      nodeIdToDatapathMap: nodeIdToDatapathMap,
      nodeIdStatusMap: nodeIdStatusMap,
      rootNodeDatapaths: parsedObject.rootNodeDatapaths
    };
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
        <VillanelleAceEditor
          handler={this.setCode}
          code={this.state.code}
          height={windowHeight - 200}
          saveHandler={this.saveFile}
          saveAsHandler={this.saveAsFile}
          openHandler={this.openFile}
        />
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
        mainPage = <VillanellePlayArea hasErrors={true} uio={uio} handler={this.setNodeIdStatusMap} />;
      } else {
        let playAreaPanel = <VillanellePlayArea hasErrors={false} uio={uio} handler={this.setNodeIdStatusMap} />;
        let treeVisualizerPanel = <VillanelleTreeVisualizer
          doc={this.state.doc}
          errors={this.state.errors}
          showDebugState={true}
          nodeIdToDatapathMap={this.state.nodeIdToDatapathMap}
          nodeIdStatusMap={this.state.nodeIdStatusMap}
          rootNodeDatapaths={this.state.rootNodeDatapaths}
          dataPathToNodeStatusMap={this.dataPathToNodeStatusMap}
          dataPathToNodeIdMap={this.dataPathToNodeIdMap} />

        mainPage = this.getSplitPane(windowWidth, windowHeight, playAreaPanel, treeVisualizerPanel);
      }
    }

    return (
      <div>
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <VillanelleNavbar
          handler={this.setCurrentTab}
          currentTab={this.state.currentTab}
          fixToTop={this.state.currentTab === 'Script'}
          saveHandler={this.saveFile}
          saveAsHandler={this.saveAsFile}
          openHandler={this.openFile}
          currentFile={this.state.currentFile}
          unsaved={this.state.unsaved} />
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

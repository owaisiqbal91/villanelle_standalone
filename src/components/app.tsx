import * as React from 'react';
import { VillanelleEditor } from './villanelle_editor';
import { VillanelleNavbar } from './villanelle_navbar';
import { VillanellePlayArea } from './villanelle_playarea';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from '../parsing/antlr_parser';

export class App extends React.Component<{}, { currentTab: string }> {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'Play'
    };
    this.setCurrentTab = this.setCurrentTab.bind(this);

    //yaml test
    try {
      var doc = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, "../test.yml"), 'utf8'));
      //console.log(doc);
    } catch (e) {
      console.log(e);
    }

    //antlr test
    parse();
  }

  public setCurrentTab(currentTab) {
    this.setState({ currentTab: currentTab });
  }

  render() {

    let mainPage;

    if (this.state.currentTab === 'Script') {
      mainPage = <VillanelleEditor />;
    } else if (this.state.currentTab === 'Play') {
      mainPage = <VillanellePlayArea />;
    }

    return (
      <div>
        <VillanelleNavbar handler={this.setCurrentTab} currentTab={this.state.currentTab} />
        {mainPage}
      </div>
    );
  }
}

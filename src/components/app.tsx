import * as React from 'react';
import { VillanelleNavbar } from './villanelle_navbar';
import { VillanellePlayArea } from './villanelle_playarea';
import { VillanelleAceEditor } from './villanelle_ace_editor';

export class App extends React.Component<{}, { currentTab: string, code: string}> {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'Script',
      code: ''
    };
    this.setCurrentTab = this.setCurrentTab.bind(this);
    this.setCode = this.setCode.bind(this);
  }

  public setCurrentTab(currentTab) {
    this.setState({ currentTab: currentTab });
  }

  public setCode(code) {
    this.setState({code: code});
  }

  render() {

    let mainPage;

    if (this.state.currentTab === 'Script') {
      mainPage = <VillanelleAceEditor handler={this.setCode} code={this.state.code}/>;
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

import * as React from 'react';
import { VillanelleEditor } from './villanelle_editor';
import { VillanelleNavbar } from './villanelle_navbar';
import { VillanellePlayArea } from './villanelle_playarea';

export class App extends React.Component<{}, { currentTab: string }> {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'Play'
    };
    this.setCurrentTab = this.setCurrentTab.bind(this);
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

import injectTapEventPlugin from 'react-tap-event-plugin';
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import ScrapBtn from './components/scrap-btn';
import ShowSavedBtn from './components/show-saved'

injectTapEventPlugin();

class App extends Component {
  render() {
    return (
        <MuiThemeProvider>
          <div>
                <ShowSavedBtn />
                <ScrapBtn />
          </div>
        </MuiThemeProvider>

    );
  }
}

export default App;
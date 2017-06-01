import injectTapEventPlugin from 'react-tap-event-plugin';
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import logo from './logo.svg';
import './App.css';
import ScrapBtn from './components/scrap-btn';


injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
          <ScrapBtn />
      </MuiThemeProvider>
    );
  }
}

export default App;

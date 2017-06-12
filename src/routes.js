import React from 'react';
import { Router, Route } from 'react-router';

import App from './App.js';
import Save from './components/SavePage';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/savedArticles" component={Save} />
  </Router>
);

export default Routes;
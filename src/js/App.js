/**
 * Main React file
 * Import other components here
 */

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../scss/App.scss';

import Catalog from './Catalog/Catalog.js';
import Master from './Master.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Master}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
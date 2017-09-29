//import './Test.js';
//import './Catalog.js';
import Catalog from './Catalog/Catalog.js';
import HomePage from './HomePage/HomePage.js';
//import NavBar from './NavBar/NavBar.js'
import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
require ('../scss/App.scss');

/**
 * Main React file
 * Import other components here
 */

class App extends Component {
  render() {
    return(
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/catalog" component={Catalog} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

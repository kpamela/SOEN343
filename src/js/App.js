//import './Test.js';
//import './Catalog.js';
import Catalog from './Catalog/Catalog_v1.2.js';
import HomePage from './HomePage/HomePage.js';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
require ('../scss/App.scss');

/**
 * Main React file
 * Import other components here
 */

<<<<<<<<< Temporary merge branch 1
import React, { Component } from 'react';
import '../scss/App.scss';
import './Catalog/Catalog.js';
import NavBar from './NavBar/NavBar.js';
class App extends Component {
  render() {
    return (
      <div id="Catalogue" className="App">
      Insert large image here
      <NavBar/>
=========
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
>>>>>>>>> Temporary merge branch 2
      </div>
    );
  }
}
<<<<<<<<< Temporary merge branch 1
=========

>>>>>>>>> Temporary merge branch 2
export default App;

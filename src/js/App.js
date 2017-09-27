/**
 * Main React file
 * Import other components here
 */

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
      </div>
    );
  }
}
export default App;
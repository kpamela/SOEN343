
import Catalog from './Dashboard/Dashboard.js';
import Main from './Main/Main.js';
import NavBar from './NavBar/NavBar.js';
import HomePage from './HomePage/HomePage.js';
import AboutUs from './AboutUs/AboutUs.js';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import auth from './General/auth.js'


/**
 * Main React file
 * Import other components here
 */

class App extends Component {

  render() {
    return(
      <div className="App">
        <BrowserRouter>
          <div>
            <Route path="/" component={Main} />
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/catalog" component={Catalog} />
                <Route path="/aboutus" component={AboutUs} />
              </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
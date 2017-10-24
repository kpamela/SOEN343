
import {AdminDashboard} from './Dashboard/AdminDashboard.js';
import {ClientDashboard} from './Dashboard/ClientDashboard.js';
import Catalogue from './Dashboard/Catalogue.js';
import Main from './Main/Main.js';
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
/**
 * To be added when catalog is created: <Route path="/catalog" component={Catalog} />
 */
  render() {
    return(
      <div className="App">
        <BrowserRouter>
          <div>
            <Route path="/" component={Main} />
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/AdminDashboard" component={AdminDashboard} />
                <Route path="/ClientDashboard" component={ClientDashboard} />
                <Route path="/Catalogue" component={Catalogue}/>
                <Route path="/aboutus" component={AboutUs} />
              </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
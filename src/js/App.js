
import Catalog from './Catalog/Dashboard.js';
import Main from './Main/Main.js';
import NavBar from './NavBar/NavBar.js'
import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import auth from './General/auth.js'
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
          <div>
              <Route path="/" component={Main} />
                <Switch>
                  <Route path="/catalog" component={Catalog} />
                </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
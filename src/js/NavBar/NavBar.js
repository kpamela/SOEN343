import React, { Component } from 'react';
import { Link, BrowserRouter, Route } from 'react-router-dom';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import Register from '../Register/Register2.js';
import Catalog from '../Catalog/Catalog.js';


export default class NavBar extends Component{
  render(){
    return(
      <BrowserRouter>
        <div>
          <Navbar className="navbar-container" inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link className="nav-link" to="/">TecMarket</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1}><Link className="nav-link" to="/">Home</Link></NavItem>
                <NavItem eventKey={2} href="#">About us</NavItem>
                <NavDropdown eventKey={3} title="Shop" id="basic-nav-dropdown">
                  <MenuItem eventKey={3.1}>Computer Systems</MenuItem>
                  <MenuItem eventKey={3.2}>Televisions</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.3}><Link className="menu-link" to="/catalog">Shop all categories</Link></MenuItem>
                </NavDropdown>
              </Nav>
              <Nav pullRight>
                <NavItem eventKey={1} href="/login">Login</NavItem>
                <NavItem eventKey={2}><Link className="nav-link" to="/register">Register</Link></NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Route path="/register" component={Register} />
          <Route path="/catalog" component={Catalog} />
        </div>
      </BrowserRouter>
    );
  }
}
import React, { Component } from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';


export default class NavBar extends Component{
  render(){
    return(
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">TecMarket</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">Home</NavItem>
            <NavItem eventKey={2} href="#">About us</NavItem>
            <NavDropdown eventKey={3} title="Shop" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Computer Systems</MenuItem>
              <MenuItem eventKey={3.2}>Televisions</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Shop all categories</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">Login</NavItem>
            <NavItem eventKey={2} href="#">Register</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

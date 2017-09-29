import React, { Component } from 'react';
import { LoginModal } from './LoginModal.js';
import { RegisterModal } from './RegisterModal.js';
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
              <NavDropdown eventKey={4} title="Computer Systems" id="basic-nav-dropdown">
                <MenuItem eventKey={4.1}> Tablets </MenuItem>
                <MenuItem eventKey={4.2}> Laptops </MenuItem>
                <MenuItem eventKey={4.3}> Desktops </MenuItem>
              </NavDropdown>
              <NavDropdown eventKey={5} title="Televisions" id="basic-nav-dropdown">
                <MenuItem eventKey={5.1}> OLED </MenuItem>
                <MenuItem eventKey={5.2}> HD </MenuItem>
                <MenuItem eventKey={5.3}> 4K </MenuItem>
              </NavDropdown>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Shop all categories</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#"> < LoginModal /> </NavItem>
            <NavItem eventKey={2} href="#"> <RegisterModal/> </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
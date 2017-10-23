import React, { Component } from 'react';
import { LoginModal } from './LoginModal.js';
import { RegisterModal } from './RegisterModal.js';
import Logout from './Logout.js';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {ShoppingCartModal} from './ShoppingCartModal.js';


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
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Shop all categories</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#"> < LoginModal /> </NavItem>
            <NavItem eventKey={2} href="#"> <RegisterModal/> </NavItem>
            <NavItem eventKey={3} href="#"> <Logout /> </NavItem>
            <NavItem eventKey={4} href="#"><ShoppingCart/></NavItem>
          
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
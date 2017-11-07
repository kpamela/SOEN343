import React, { Component } from 'react';
import { LoginModal } from './LoginModal.js';
import { RegisterModal } from './RegisterModal.js';
import Logout from './Logout.js';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import auth from '../General/auth.js';
import {ShoppingCartModal} from "./ShoppingCartModal";


export default class NavBar extends Component{
  render(){
    return(
      <Navbar className="Navbar" inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/" className="NavbarLink">TecMarket</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1}><Link className="NavbarLink" to="/">Home</Link></NavItem>
            <NavItem eventKey={2}><Link className="NavbarLink" to="/aboutus">About us</Link></NavItem>
            <NavDropdown className="NavbarItem" eventKey={3} title="Shop" id="basic-nav-dropdown">
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
              <MenuItem eventKey={3.3}><Link className="NavbarDropdownLink" to="/catalog">Shop all categories</Link></MenuItem>
            </NavDropdown>
            {auth.getIsAdmin() == 1 ? <NavItem><Link className="NavbarLink" to="/dashboard">Administrator Dashboard</Link></NavItem> : null}
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#"> < LoginModal /> </NavItem>
            <NavItem eventKey={2} href="#"> <RegisterModal/> </NavItem>
            <NavItem eventKey={3} href="#"> <Logout /> </NavItem>
            <NavItem eventKey={4} href="#"><ShoppingCartModal/></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
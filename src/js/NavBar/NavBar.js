import React, { Component } from 'react';
import { LoginModal } from './LoginModal.js';
import { RegisterModal } from './RegisterModal.js';
import Logout from './Logout.js';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {ShoppingCartModal} from './ShoppingCartModal.js';
import {PurchaseHistoryModal} from './PurchaseHistoryModal.js';
import {AccountSettings} from './AccountSettings.js';
import {ActiveUsersModal} from './ActiveUsersModal.js';


import { Link } from 'react-router-dom';
import auth from '../General/auth.js';


export default class NavBar extends Component{
  render(){
    return(
      <Navbar className="Navbar" inverse collapseOnSelect staticTop>
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
            {auth.getIsAdmin() == 0 ? <NavItem><Link className="NavbarLink" to="/ClientDashboard">Shop all categories</Link></NavItem> : null}
            {auth.getIsAdmin() == 1 ? <NavItem><Link className="NavbarLink" to="/AdminDashboard">Administrator Dashboard</Link></NavItem> : null}

          </Nav>

          <Nav pullRight>
            {!auth.loggedIn() ? <NavItem eventKey={1} href="#"> <LoginModal/> </NavItem> : null}
            {!auth.loggedIn() ? <NavItem eventKey={2} href="#"> <RegisterModal/> </NavItem>: null}
            {auth.loggedIn() ? <NavItem eventKey={3} href="#"> <div id="AccountSettings"></div> </NavItem>: null}
            {auth.loggedIn() ? <NavItem eventKey={3} href="#"> <div id="RegisteredUser"></div> </NavItem>: null}
            {auth.loggedIn() ? <NavItem eventKey={3} href="#"> <div id="ActiveUsers"></div> </NavItem>: null}
            {auth.loggedIn() ? <NavItem eventKey={3} href="#"> <Logout/> </NavItem>: null}
            {auth.loggedIn() ? <NavItem eventKey={4} href="#"> <div id="ShoppingCart"></div> </NavItem> : null}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

import React, { Component } from 'react';
import { LoginModal } from './LoginModal.js';
import { RegisterModal } from './RegisterModal.js';
import Logout from './Logout.js';
import MyAccount from './MyAccount.js';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {ShoppingCartModal} from './ShoppingCartModal.js';
import {UserActivity} from './UserActivity.js';
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
            {auth.getIsAdmin() == 1 ? <NavItem><Link className="NavbarLink" to="/UserActivity">User Activity</Link></NavItem> : null}
          </Nav>

          <Nav pullRight>
            {!auth.loggedIn() ? <NavItem eventKey={1} href="#"> <LoginModal/> </NavItem> : null}
            {!auth.loggedIn() ? <NavItem eventKey={2} href="#"> <RegisterModal/> </NavItem>: null}
            {auth.loggedIn() ? <NavItem eventKey={3} href="#"> <MyAccount/></NavItem>: null}
            {auth.loggedIn() ? <NavItem eventKey={4} href="#"> <div id="ShoppingCart"></div></NavItem> : null}
            {auth.loggedIn() ? <NavItem> <div id="PurchaseHistory"></div> </NavItem>: null}
            {auth.loggedIn() ? <NavItem  eventKey={5} href="#"><Logout /></NavItem> : null}

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
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
            <NavDropdown className="NavbarItem" eventKey={3} title="Shop" id="basic-nav-dropdown">
              <NavDropdown eventKey={4} title="Computer Systems" id="basic-nav-dropdown">
                <MenuItem eventKey={4.1}> Tablets </MenuItem>
                <MenuItem eventKey={4.2}> Laptops </MenuItem>
                <MenuItem eventKey={4.3}> Desktops </MenuItem>
        
              </NavDropdown>
              <MenuItem divider />
              <MenuItem eventKey={3.3}><Link className="NavbarDropdownLink" to="/ClientDashboard">Shop all categories</Link></MenuItem>
            </NavDropdown>
            
    
            {auth.getIsAdmin() == 1 ? <NavItem><Link className="NavbarLink" to="/AdminDashboard">Administrator Dashboard</Link></NavItem> : null}
            {auth.getIsAdmin() == 1 ? <NavItem><Link className="NavbarLink" to="/UserActivity">User Activity</Link></NavItem> : null}
          </Nav>
          <Nav pullRight>
            {!auth.loggedIn() ? <NavItem eventKey={1} href="#"> <LoginModal/> </NavItem> : null}
            {!auth.loggedIn() ? <NavItem eventKey={2} href="#"> <RegisterModal/> </NavItem>: null}
            {auth.loggedIn() ? <NavItem eventKey={3} href="#"> <MyAccount/><p>Hello, {localStorage.getItem('username')}</p> </NavItem>: null}
            {auth.loggedIn() ? <NavItem eventKey={4} href="#"> <div id="ShoppingCart"></div><div id="PurchaseHistory"></div> </NavItem> : null}
            {auth.loggedIn() ? <NavItem  eventKey={5} href="#"><Logout /></NavItem> : null}

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
import React, { Component } from 'react';
import { LoginModal } from './LoginModal.js';
import { RegisterModal } from './RegisterModal.js';
import Logout from './Logout.js';
import MyAccount from './MyAccount.js';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {ShoppingCartModal} from './ShoppingCartModal.js';
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
            <NavItem eventKey={3}><Link className="NavbarLink" to="/ClientDashboard"> Shop </Link></NavItem>
            {auth.getIsAdmin() == 1 ? <NavItem><Link className="NavbarLink" to="/AdminDashboard">Administrator Dashboard</Link></NavItem> : null}
          </Nav>
          <Nav pullRight>
            {!auth.loggedIn() ? <NavItem eventKey={1} href="#"> <LoginModal/> </NavItem> : null}
            {!auth.loggedIn() ? <NavItem eventKey={2} href="#"> <RegisterModal/> </NavItem>: null}
            {auth.loggedIn() ? <NavDropdown className="NavbarItem" eventKey={3} title="My Account" id="basic-nav-dropdown">
                                    <MenuItem eventKey={3.1}><Link className="NavbarDropdownLink" to="/AccountSettings"> Settings </Link></MenuItem>
                                    <MenuItem eventKey={3.2}><Link className="NavbarDropdownLink" to="/PurchaseHistory"> Purchase history </Link></MenuItem>
                                    <MenuItem eventKey={3.3}> <Logout /> </MenuItem>
                               </NavDropdown>: null}
            {auth.loggedIn() ? <NavItem eventKey={4} href="#"> <ShoppingCartModal/> </NavItem> : null}

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

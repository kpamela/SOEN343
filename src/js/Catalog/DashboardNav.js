import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';


export default class DashboardNav extends React.Component{
  render() {
    return (
      <Nav bsStyle="tabs" activeKey="1" onSelect={this.handleSelect}>
        <NavItem eventKey="1" href="/catalog">Manage catalog</NavItem>
        <NavItem eventKey="2" href="/activeusers">Online Clients</NavItem>
      </Nav>
    );
  }
}

import React, { Component } from 'react';
import {Modal, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import axios from 'axios';
import auth from '../General/auth.js'
import {Redirect, Route, BrowserRouter, Switch} from 'react-router-dom';
import Catalog from '../Dashboard/Catalogue.js'


export const LoginModal = React.createClass({
  getInitialState() {
    return { 
      showModal: false,

      Username: '',
      Password: '',

      redirect:false
     };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
  },

  login(e){
    e.preventDefault();
    axios.post('/users/authenticate', {Username: this.state.Username, Password: this.state.Password})
      .then(res => {
        console.log(res);
        if(res.data.success){
          const token = res.data.token;
          localStorage.setItem('jwtToken', token);
          auth.setAuthToken(token);
          auth.setIsAdmin(res.data.user.Administrator);
          this.setState({redirect: true});
          console.log(auth.getIsAdmin());
        }
        else{
            window.alert(res.data.msg);
        }
      }).catch(function(err){
        window.alert("User not found")
        console.log(err);
    });

  },

  render() {
    if(auth.loggedIn()){
      if(auth.getIsAdmin() == 1){
        return(
          <Redirect push to="/AdminDashboard" />
        );
      }
      else if(auth.getIsAdmin() == 0){
        return(
          <Redirect push to="/ClientDashboard" />
        );
      }
    }
    return (
      <div>
        <Button bsStyle="primary" bsSize="sm" onClick={this.open}>
          Login
        </Button>

        <Modal className='loginModal' show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Login to your account to save items to save your cart and make purchases!</p>
            <form>
              <FormGroup>
                <ControlLabel>Username</ControlLabel>
                   <FormControl type="text" name="Username" value={this.state.Username} onChange={this.handleChange} placeholder="Enter Username"/>
                <ControlLabel>Password</ControlLabel>
                   <FormControl type="password" name="Password" value={this.state.Password} onChange={this.handleChange} placeholder="Enter Password"/>
                <br />
                <Button bsStyle="primary" onClick={this.login}>Submit</Button>
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

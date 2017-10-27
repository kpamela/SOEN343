import React, { Component } from 'react';
import {Modal, Button, FieldGroup} from 'react-bootstrap';
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
          auth.setIsAdmin(res.data.user.administrator);
          this.setState({redirect: true});
        }
        else{
          console.log(res.data.msg)
        }
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
            Login to your account to save items to save your cart and make purchases!
            <form onSubmit={this.login}>
              <label>
                Username: <input type="text" name="Username" value={this.state.Username} onChange={this.handleChange}/>
              </label>
              <br />
              <label>
                Password: <input type="password" name="Password" value={this.state.Password} onChange={this.handleChange}/>
              </label>
              <br />
              <input type="submit" value="Submit" />
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

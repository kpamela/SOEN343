import React, { Component } from 'react';
import {Modal, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import axios from 'axios';
import auth from '../General/auth.js';
import {Redirect, Route, BrowserRouter, Switch} from 'react-router-dom';
import Catalog from '../Dashboard/Catalogue.js';
import AlertContainer from 'react-alert';

//Regex for username and password validation
const regex =/^[a-zA-Z0-9]{4,10}$/;

//Options for react-alert
const alertOptions={
  position: 'bottom center'
}

export const LoginModal = React.createClass({
  getInitialState() {
    return { 
      showModal: false,

      Username: '',
      Password: '',

      formStatusUsername: null,
      formStatusPassword: null,

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
    this.setState({[e.target.name]: e.target.value});
    this.validateOnChange(e.target.name, e.target.value);
  },

  validateOnChange(name, value){
    if(name === 'Username'){
      if(value != '' && regex.test(value)){
        this.setState({formStatusUsername: 'success'});
      }
      else{
        this.setState({formStatusUsername: 'error'});
      }
    }
    if(name === 'Password'){
      if(value != '' && regex.test(value)){
        this.setState({formStatusPassword: 'success'});
      }
      else{
        this.setState({formStatusPassword: 'error'});
      }
    }
  },

  validateOnSubmit(){
    if(this.state.formStatusUsername === 'success' && this.state.formStatusPassword === 'success'){
      return true;
    }
    else{
      return false;
    }
  },

  login(e){
    e.preventDefault();
    if(this.validateOnSubmit()){
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
<<<<<<< HEAD
          this.msg.show(res.data.msg, {type: 'error'});
        }
      });
    }
    else{
      this.msg.show('Invalid fields', {type: 'error'});
    }
=======
            window.alert(res.data.msg);
        }
      }).catch(function(err){
        window.alert("User not found")
        console.log(err);
    });

>>>>>>> master
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
            <AlertContainer ref={a => this.msg = a} {...alertOptions}/>
              <FormGroup validationState={this.state.formStatusUsername}>
                <ControlLabel>Username</ControlLabel>
                <FormControl type="text" name="Username" value={this.state.Username} onChange={this.handleChange} placeholder="Enter Username"/>
                <FormControl.Feedback />
              </FormGroup>
              <FormGroup validationState={this.state.formStatusPassword}>
                <ControlLabel>Password</ControlLabel>
                <FormControl type="password" name="Password" value={this.state.Password} onChange={this.handleChange} placeholder="Enter Password"/>
                <FormControl.Feedback />
              </FormGroup>

                <br />
                <Button bsStyle="primary" onClick={this.login}>Submit</Button>
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

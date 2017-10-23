import React, { Component } from 'react';
import {Modal, Button, FieldGroup} from 'react-bootstrap';
import auth from '../General/auth.js';


export const RegisterModal = React.createClass({
  getInitialState() {
    return { showModal: false };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  render() {
    if(auth.loggedIn()){
      return(null);
    }
    return (
      <div>
        <Button bsStyle="default" bsSize="sm" onClick={this.open}>
          Register
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Register
            <form>
              <label>
                First Name: <input type="text" name="firstName" required/>
              </label>
              <br/>
              <label>
                Last Name: <input type="text" name="lastName" required/>
              </label>
              <br/>
              <label>
                E-mail: <input type="email" name="name" required/>
              </label>
              <br/>
              <label>
                Phone number: <input type="text" name="name" required/>
              </label>
              <br/>
              <label>
                Password: <input type="password" name="username" required/>
              </label>
              <br/>
              <label>
                Confirm Password: <input type="password" name="username" required/>
              </label>
              <br/>
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

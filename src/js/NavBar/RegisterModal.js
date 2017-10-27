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
                First Name: <input type="text" name="firstName" required pattern="([A-z]+)"
                title="Name can only contain letters"/>
              </label>
              <br/>
              <label>
                Last Name: <input type="text" name="lastName" required pattern="([A-z]+)"/>
              </label>
              <br/>
              <label>
                Street Number: <input type="text" name="streetNumber" required pattern="([0-9]+)"/>
              </label>
              <br/>
              <label>
                Street: <input type="text" name="street" required/>
              </label>
              <br/>
              <label>
                Apartment Number: <input type="text" name="apt"/>
              </label>
              <br/>
              <label>
                City: <input type="text" name="city" required/>
              </label>
              <br/>
              <label>
                State: <input type="text" name="state" required/>
              </label>
              <br/>
              <label>
                Zip Code: <input type="text" name="zip" required required pattern="([A-z][0-9][A-z][ ]?[0-9][A-z][0-9])"
                title="Zip Code must be in either A1A1A1 or A1A 1A1 format"/>
              </label>
              <br/>
              <label>
                Country: <input type="text" name="country" required/>
              </label>
              <br/>
              <label>
                E-mail: <input type="email" name="name" required/>
              </label>
              <br/>
              <label>
                Phone number: <input type="text" name="name" required pattern = "(\d{7})"
                title="Phone number can only contain 7 digits, do not include - or paranthesis"/>
              </label>
              <br/>
              <label>
                Username: <input type="text" name="username" required/>
              </label>
              <br/>
              <label>
                Password: <input type="password" name="password" required/>
              </label>
              <br/>
              <label>
                Confirm Password: <input type="password" name="confirmPassword" required/>
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

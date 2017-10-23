import React, {Component } from 'react';
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
                      First Name: <input type="text" name="firstName" />
                    </label>
                    <br/>
                    <label>
                      Last Name: <input type="text" name="lastName" />
                    </label>
                    <br/>
                    <label>
                      E-mail: <input type="email" name="name" />
                    </label>
                    <br/>
                    <label>
                      Street Number: <input type="number" name="streetNumber"/>
                    </label>
                    <br/>
                    <label>
                      Street Name: <input type="text" name="streetName"/>
                    </label>
                    <label>
                      Apt: <input type="text" name="apt"/>
                    </label>
                    <br/>
                    <label>
                      City: <input type="text" name="city"/>
                    </label>
                    <br/>
                    <label>
                      Postal Code: <input type="text" name="postalCode"/>
                    </label>
                    <br/>
                    <label>
                      Country:
                      <select name="country">
                        <option value="canada">Canada</option>
                      </select>
                    </label>
                    <br/>
                    <label>
                      Phone Number: <input type="tel" name="name" />
                    </label>
                    <br/><br/>
                    <label>
                      Username: <input type="text" name="username" />
                    </label>
                    <br/>
                    <label>
                      Password: <input type="password" name="username" />
                    </label>
                    <br/>
                    <label>
                      Confirm Password: <input type="password" name="username" />
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

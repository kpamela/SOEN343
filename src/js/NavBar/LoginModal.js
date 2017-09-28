import React, { Component } from 'react';
import {Modal, Tooltip, Popover, Button, FieldGroup} from 'react-bootstrap';


export const LoginModal = React.createClass({
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
    return (
      <div>
        <Button bsStyle="primary" bsSize="sm" onClick={this.open}>
          Login
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Login to your account to save items to save your items!
            <form>
              <label>
                Username:
                <input type="text" name="name" />
              </label>
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

import React, { Component } from 'react';
import {Modal, Tooltip, Popover, Button, FieldGroup} from 'react-bootstrap';


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

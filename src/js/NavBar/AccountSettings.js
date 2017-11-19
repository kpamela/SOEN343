import React, {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {Modal, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import auth from '../General/auth.js';
import {PurchaseHistoryModal} from './PurchaseHistoryModal.js';
import {ShoppingCartModal} from './ShoppingCartModal.js';
import {Catalogue} from '../Dashboard/Catalogue.js';


export const AccountSettings = React.createClass({

  getInitialState() {
    return {
      showModal: false,
      redirect:false,
      usr: auth.login(),
      confirm: false
     };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  delete(){
    confirm = window.confirm("Are you sure you want todelete your account?");
    if(confirm){
      axios.post('/removeUser', this.usr);
    }
  },


  render() {
    return (
      <div>
        <Button bsSize="sm" onClick={this.open}>
          Profile
        </Button>
        <Modal className='accountSettingsModal' show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <h1> Purchase History </h1>
          View all your previous purchases or return an item
          <PurchaseHistoryModal user={this.state.usr}/>

          <h1> Delete Account </h1>
          This action is irreversible! Please be careful while proceeding <br/>
          <Button bsStyle="danger" bsSize="sm" onClick={this.delete}> Delete </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );

    }
});

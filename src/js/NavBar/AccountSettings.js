/**
 * Created by kpamela on 2017-11-19.
 */
import React, {Component} from 'react';
import axios from 'axios';
import {Modal, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import auth from '../General/auth.js';
import {PurchaseHistoryModal} from './PurchaseHistoryModal.js';


export const AccountSettings = React.createClass({

  getInitialState() {
    return {
      showModal: false,
      redirect:false,
      confirm: false
     };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  logOut(){
      axios.post("/users/logout",{username: localStorage.getItem('username')})
          .then(function(res){

          }).catch(function(err){
              console.log(err);
      });
      auth.logOut();
      this.setState({redirect:true});
  },

  delete(){
    let confirm = window.confirm("Are you absolutely sure you want to remove your account?");
      if(confirm){
          this.props.user.deleteAccount();
          auth.logOut();
          this.setState({redirect:true});
      }

  },

  render() {
    if(this.state.redirect){
        location.href = "/";
        return(
            <Redirect to="/" />
        );
    }
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
          <PurchaseHistoryModal user={this.props.user}/>

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

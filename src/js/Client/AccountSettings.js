import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import auth from '../General/auth.js';
import {PurchaseHistoryModal} from './PurchaseHistoryModal.js';

export default class AccountSettings extends Component{
    render(){
        return(
          <div className="Centered-Container">
            <h1> Account Settings </h1>
            <p> WARNING: The following action cannot be reversed. Please make sure to proceeed carefully. </p>
            <Button bsSize="sm" bsStyle="danger"> Delete Account </Button>

          </div>
        );

    }
}

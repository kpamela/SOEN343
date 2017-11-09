import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import auth from '../General/auth.js';

export default class MyAccount extends Component{

    render(){
        return(
            <Button bsSize="sm"> My Account </Button>
        );

    }
}

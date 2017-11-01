import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import auth from '../General/auth.js';

export default class Logout extends Component{
    constructor(props){
        super(props);

        this.state ={
            redirect:false
        }

        this.logOut = this.logOut.bind(this);
    }

    logOut(){
        auth.logOut();
        this.setState({redirect:true});
    }
    
    render(){
        if(this.state.redirect){
            return(
                <Redirect to="/" />
            );
        }
        return(
            <Button bsSize="sm" onClick={this.logOut}> Logout</Button>
        );

    }
}
import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import auth from '../General/auth.js';

/**
 * Login and sign up page
 */

export default class HomePage extends Component{
    constructor(props){
        super(props);

        this.state = {
            formType: 'login'
        }
    }

    render(){
        let path = this.props.location.pathname;
        return(
            <div className="homepage">
                <div className="landing-page-form-container">
                    HomePage
                </div>
            </div>
        );
    }


}
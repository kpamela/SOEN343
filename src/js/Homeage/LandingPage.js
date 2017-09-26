import React, { Component } from ('react');
import { Link } from 'react-router';
import axios from 'axios';

class LandingPage extends Component{
    
    // Post request
    // Registers the user and returns the user
    registerUser(user){
        axios.post('users/register', user)
        .map(res => res.json());
    }

    // Post request
    // Authenticates the user and returns the user
    authenticateUser(user){
        axios.post('users/authenticate', user)
        .map(res => res.json());
    }

    // Gets the token from local storage
    loadToken(){
        const token = localStorage.getItem('id_token');
         let authToken = token
    }

}
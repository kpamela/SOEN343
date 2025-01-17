import axios from 'axios';
import decode from 'jwt-decode';
import Admin from './Admin.js';
import Client from './Client.js';
import User from './User.js'

function setAuthToken(token){
    if(token){
        axios.defaults.headers.common['Authorization'] = 'Bearer' + token
    }
    else{
        delete axios.defaults.header.common['Authorization'];
    }
}

function getCredentials(token){
    let user = token;
    if(token){
        try{
            user = decode(token);
        }
        catch(err){
            user = null;
        }
    }
    return user;
}

function setIsAdmin(isAdmin){
    localStorage.setItem('isAdmin', isAdmin);
}

function getIsAdmin(){
    return localStorage.getItem('isAdmin');
}

function loggedIn(){
    if(getCredentials(localStorage.getItem('jwtToken'))){
        return true;
    }
    else{
        return false;
    }
}

function logOut(){
    localStorage.clear();
}

//TODO proper login
function login(){
    if(localStorage.getItem('jwtToken')){//if logged in
        let username = getCredentials(localStorage.getItem('jwtToken')).user.Username;
        localStorage.setItem('username', username);
        if(getIsAdmin() == 1){
            return new Admin(username);
        }
        else if(loggedIn()){
            console.log(username);
            return new Client(username);
        }
    }
    else{
        return new User();
    }
}

export default{
    setAuthToken: setAuthToken,
    getCredentials: getCredentials,
    setIsAdmin: setIsAdmin,
    getIsAdmin: getIsAdmin,
    loggedIn: loggedIn,
    logOut: logOut,
    login: login
}

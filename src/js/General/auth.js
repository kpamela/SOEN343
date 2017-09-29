import axios from 'axios';
import decode from 'jwt-decode';

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

function loggedIn(nextState, replace){
    if(getCredentials(localStorage.getItem('jwtToken'))){
        replace('/dashboard');
    }
}

export default{
    setAuthToken: setAuthToken,
    getCredentials: getCredentials,
    loggedIn: loggedIn
}
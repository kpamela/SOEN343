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

export default{
    setAuthToken: setAuthToken,
    getCredentials: getCredentials,
    setIsAdmin: setIsAdmin,
    getIsAdmin: getIsAdmin,
    loggedIn: loggedIn,
    logOut: logOut
}

const express = require('express'),
    users = express.Router(),
    bcrypt = require('bcryptjs'),
    mysql = require('mysql'),                             // When all queries are moved to tdg, this can be removed
    db = require('../../data-source/config/database.js'),
    jwt = require('jsonwebtoken'),
    userTDG = require('../../data-source/TDG/userTDG');
class User{
    constructor(user){
        this.Username       = user.Username;
        this.Password       = user.Password;
        this.FirstName      = user.FirstName;
        this.LastName       = user.LastName;
        this.EmailAddress   = user.EmailAddress;
        this.PhoneNumber    = user.PhoneNumber;
        this.Administrator  = user.Administrator;
    }

}

module.exports = User;

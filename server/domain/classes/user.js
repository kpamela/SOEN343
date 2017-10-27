const express = require('express'),
    users = express.Router(),
    bcrypt = require('bcryptjs'),
    mysql = require('mysql'),                             // When all queries are moved to tdg, this can be removed
    db = require('../../data-source/config/database.js'),
    jwt = require('jsonwebtoken'),
    userTDG = require('../../data-source/TDG/UserTDG');
class User{
    constructor(user){
        this.username = user.Username;
        this.password = user.Password;
        this.firstName = user.FirstName;
        this.lastName = user.LastName;
        this.emailAddress = user.EmailAddress;
        this.phoneNumber = user.PhoneNumber;
        this.administrator = user.Administrator;
    }

}

module.exports = User;

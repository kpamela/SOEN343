const express = require('express'),
    users = express.Router(),
    mysql = require('mysql'),
    table = require('../../data-source/models/users.js'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    db = require('../../data-source/config/database.js');
    User = require('../classes/user.js');

db.getConnection((err, connection) => {

    // Create the users table
    users.get('/createtable', (req, res) => {
        let sql = table;
        connection.query(sql, (err, result) => {
            if(err) throw err;
            res.send(result);
        });
    });

    // Register user in the db
    users.post('/register', (req, res) => {
        let newUser = new User(req.body);
        newUser.register().then((result) => {
            if(result.success){
                res.status(200).json(result);
            }
            else{
                res.status(401).json(result);
            }
        }).catch(function(err){

        });
    });

    // Authenticate the user
    users.post('/authenticate', (req, res) => {

        let newUser = new User(req.body);
        newUser.authenticate().then((result) => {
            if(result.success){
                res.status(200).json(result);
            }
            else{
                res.status(401).json(result);
            }
        });
    });
});

module.exports = users;

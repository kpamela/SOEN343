const express = require('express'),
    users = express.Router(),
    mysql = require('mysql'),
    table = require('../models/address.js'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    db = require('../config/database.js');

db.getConnection((err, connection) => {
    
    // Create the Adress table
    users.get('/createtable', (req, res) => {
        let sql = table;
        connection.query(sql, (err, result) => {
            if(err) throw err;
            res.send(result);
        });
    });
});
const express = require('express'),
    users = express.Router(),
    mysql = require('mysql'),
    table = require('../models/Products.js'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    db = require('../config/database.js');

db.getConnection((err, connection) => {
    
    // Create the Products table
    users.get('/createtable', (req, res) => {
        let sql = table;
        connection.query(sql, (err, result) => {
            if(err) throw err;
            res.send(result);
        });
    });
});
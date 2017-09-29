const express = require('express'),
    completedPurchases = express.Router(),
    mysql = require('mysql'),
    table = require('../models/CompletedPurchases.js'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    db = require('../config/database.js');

db.getConnection((err, connection) => {
    
    // Create the CompletedPurchases table
    completedPurchases.get('/createtable', (req, res) => {
        let sql = table;
        connection.query(sql, (err, result) => {
            if(err) throw err;
            res.send(result);
        });
    });

});
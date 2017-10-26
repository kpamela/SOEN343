const express = require('express'),
    laptop = express.Router(),
    mysql = require('mysql'),
    table = require('../models/Laptop.js'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    db = require('../../../data-source/config/database.js');

db.getConnection((err, connection) => {
    
    // Create the Laptop table
    laptop.get('/createtable', (req, res) => {
        let sql = table;
        connection.query(sql, (err, result) => {
            if(err) throw err;
            res.send(result);
        });
    });

});
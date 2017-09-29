const express = require('express'),
    television = express.Router(),
    mysql = require('mysql'),
    table = require('../models/Television.js'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    db = require('../config/database.js');

db.getConnection((err, connection) => {
    
    // Create the Television table
    television.get('/createtable', (req, res) => {
        let sql = table;
        connection.query(sql, (err, result) => {
            if(err) throw err;
            res.send(result);
        });
    });

});
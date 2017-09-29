const express = require('express'),
    desktopComputer = express.Router(),
    mysql = require('mysql'),
    table = require('../models/DesktopComputer.js'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    db = require('../config/database.js');

db.getConnection((err, connection) => {
    
    // Create the DesktopComputer table
    desktopComputer.get('/createtable', (req, res) => {
        let sql = table;
        connection.query(sql, (err, result) => {
            if(err) throw err;
            res.send(result);
        });
    });

});
const express = require('express'),
    users = express.Router(),
    mysql = require('mysql'),
    table = require('../models/users.js'),
    db = require('../config/database.js');


db.getConnection((err, connection) => {
    
    // Create the users table
    users.get('/createtable', (req, res) => {
        let sql = table;
        connection.query(sql, (err, result) => {
            if(err) throw err;
        });
    });
});

module.exports = users;
const express = require('express'),
    shoppingCartHoldings = express.Router(),
    mysql = require('mysql'),
    table = require('../models/ShoppingCartHoldings.js'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    db = require('../../../data-source/config/database.js');

db.getConnection((err, connection) => {
    
    // Create the ShoppingCartHoldings table
    shoppingCartHoldings.get('/createtable', (req, res) => {
        let sql = table;
        connection.query(sql, (err, result) => {
            if(err) throw err;
            res.send(result);
        });
    });

});
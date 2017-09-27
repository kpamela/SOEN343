const express = require('express'),
    products = express.Router(),
    mysql = require('mysql'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    db = require('../config/database.js');

db.getConnection((err, connection) => {

    // Add a product in the db
    products.post('/add', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        
    });

module.exports = users;

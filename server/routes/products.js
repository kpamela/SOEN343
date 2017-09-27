const express = require('express'),
    products = express.Router(),
    mysql = require('mysql'),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    db = require('../config/database.js');

db.getConnection((err, connection) => {

  // Register user in the db
  products.post('/add', (req, res) => {
    //Authenticate the request using jwt
    //Verify if a token is provided
    var token = req.headers['Authorization'];
    if (!token){
      return res.json(401, {success: false, msg: "Unauthorized"});
    }

    //Validate token signature
    jwt.verify(token, 'mysecret', function(err, decoded) {
      if (err){
        return res.json(401, {success: false, msg: "Unauthorized"});
      } else {
        return res.json(201, {success: true, msg: "New Product Created"});
      }
    });
  });
});

module.exports = products;

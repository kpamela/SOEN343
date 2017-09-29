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
    var token = req.headers.authorization;
    if (!token){
      return res.json(401, {success: false, msg: "Unauthorized: No Token Provided"});
    }

    //Validate token signature
    jwt.verify(token, 'mysecret', function(err, decoded) {
      if (err){
        return res.json(401, {success: false, msg: "Unauthorized: Incorrect Token Signature"});
      } else {
        let newProduct = req.body.product;
        let category = req.body.category;
        let newCatalogueItem = {
          SerialNumber : newProduct.SerialNumber,
          Available : newProduct.Available
        }

        //verify if the category is valid
        if (!category.match(/^(desktopComputer|tablet|laptop|television)$/)){
          return res.json(400, {success: false, msg: "Invalid product category."});
        }

        //Build query and add new catalogue entry
        let sql = `INSERT INTO catalogue SET ?`;
        connection.query(sql, newCatalogueItem, (err, result) => {
            if(err){
                console.log(err);
                return res.json(500, {success: false, msg: "New Catalogue Item Could Not Be Added"});
            }
            else{
              //Build query and add new product in the db
              sql = `INSERT INTO ${category} SET ?`;
              connection.query(sql, newProduct, (err, result) => {
                  if(err){
                      console.log(err);
                      return res.json(500, {success: false, msg: "New Product Could Not Be Added"});
                  }
                  else{
                      return res.json(201, {success: true, msg: "New Product Has Been Added"});
                  }
              });
            }
        });
      }
    });
  });
});

module.exports = products;

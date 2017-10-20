const express = require('express'),
    products = express.Router(),
    mysql = require('mysql'),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    db = require('../../data-source/config/database.js'),
    Television = require('../classes/ProductClasses/television'),
    DesktopComputer =  require('../classes/ProductClasses/desktopComputer'),
    LaptopComputer = require('../classes/ProductClasses/laptopComputer'),
    TabletComputer = require('../classes/ProductClasses/tabletComputer'),
    Monitor = require('../classes/ProductClasses/television');

db.getConnection((err, connection) => {
  // Get all products
  products.get('/view', (req, res) => {
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
        //get all of the products from the database
        let sqlMultiple = 'SELECT * FROM television; SELECT * FROM desktopcomputer; SELECT * FROM tabletcomputer; SELECT * FROM laptop; SELECT * FROM monitordisplay';

        connection.query(sqlMultiple, function (error, results, fields) {
          if (error) return res.json(500, {success: false, msg: "Items could not be retrieved"});
          // `results` is an array with one element for every statement in the query:
          console.log(results[0]);
          let products = {
            television: results[0],
            desktopcomputer: results[1],
            tabletcomputer: results[2],
            laptop: results[3],
            monitor: results[4]
          }

          return res.json(200, products);

        });
      }
    });
  });

  // Add a product in the db
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
        //verify if the category is valid

        let category = req.body.data.category;
        if (!category.match(/^(DesktopComputer|TabletComputer|LaptopComputer|television|Monitor)$/)){
          return res.json(400, {success: false, msg: "Invalid product category."});
        }

        // build newProduct JSON Object by parsing the request
        let newProduct = {category: req.body.data.category, amount: req.body.data.amount};
        for(let i in req.body.data.description){
            newProduct[i] = req.body.data.description[i];
        }

        console.log(newProduct);

        // Instantiate the right product class based on the category
        var product;

        switch(category){
            case 'DesktopComputer':
              product = new DesktopComputer(newProduct);
              break;
            case 'TabletComputer':
              product = new TabletComputer(newProduct);
              break;
            case 'LaptopComputer':
              product = new LaptopComputer(newProduct);
              break;
            case 'Television':
              product = new Television(newProduct);
              break;
            case 'Monitor':
              product = new Monitor(newProduct);
              break;
        }

        if (!product.create()){
            console.log("he, no success");
            return res.status(500).json({success: false, message: "Product Couldn't be created"});
        } else {
            console.log("he, success");
            return res.status(200).json({success: true, message: "Product Created"});
        }
      }
    });
  });

  // Remove a product in the db
  products.delete('/delete', (req, res) => { //REPLACE .post with DELETE?
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
        //verify if the category is valid
        let category = req.body.category;
        if (!category.match(/^(desktopComputer|tabletcomputer|laptop|television|monitordisplay)$/)){
          return res.json(400, {success: false, msg: "Invalid product category."});
        }

        // build newProduct JSON Object by parsing the request
        let oldProduct = req.body;

        let oldCatalogueItem = {
          SerialNumber : oldProduct.SerialNumber,
          Available : oldProduct.Available
        }

        //Build query and add new catalogue entry
        let sql = `DELETE FROM catalogue WHERE ?`;
        connection.query(sql, oldCatalogueItem, (err, result) => {
            if(err){
                console.log(err);
                return res.json(500, {success: false, msg: "Catalogue Item Could Not Be Removed", error: err});
            }
            else{
              console.log("Item has been removed from the catalogue table");
              return res.json(500,{success: true, msg: "Catalogue Item Was Removed"});
              /*
              //Build query and remove product description in the db
              sql = `DELETE FROM ${category} WHERE ?`;
              connection.query(sql, oldProduct, (err, result) => {
                  if(err){
                      console.log(err);
                      return res.json(500, {success: false, msg: "New Product Could Not Be Removed", error: err});
                  }
                  else{
                      return res.json(201, {success: true, msg: "New Product Has Been Removed"});
                  }
              });*/
            }
        });
      }
    });
  });
});

module.exports = products;

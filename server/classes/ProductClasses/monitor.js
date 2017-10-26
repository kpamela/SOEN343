const express = require('express'),
    users = express.Router(),
    mysql = require('mysql'),
    db = require('../../config/database.js'),
    ProductDescription = require('./productDescription.js');


class Monitor extends ProductDescription {
    constructor(product){
        super(product);
        this.size = product.size;
    }

    create(){
        let that = this;
        return new Promise(function(resolve, reject) {
            db.getConnection((err, connection) => {
                var monitor = {
                    Discriminator: "monitordisplay",
                    ProductName : that.productName,
                    BrandName : that.brandName,
                    ModelNumber: that.modelNumber,
                    Dimensions: that.dimensions,
                    Price: that.price,
                    Weight: that.weight,
                    Size: that.size
                }

                //Build query and add new product in the db
                let sql = `INSERT INTO models SET ?`;
                connection.query(sql, monitor, (err, result) => {
                    if (err){
                        console.log(err);
                        return reject(err);
                    } else {
                        // Build the appropriate number of products to put in the product table
                        var products = [];
                        for (var i = 0; i < that.amountRemaining; i++){
                            console.log(i);
                            if (!products[i]){
                                products[i] = [];
                            }
                            products[i][0] = that.modelNumber;
                            products[i][1] = 1;
                        }

                        console.log(products);
                        sql = "INSERT INTO products (ModelNumber, Available) VALUES ?";
                        connection.query(sql, [products], (err, result) => {
                            if (err){
                                console.log(err);
                                return reject(err);
                            } else {
                                resolve(result);
                            }
                        });
                    }
                });
            });
        });

    }
}

module.exports = Monitor;
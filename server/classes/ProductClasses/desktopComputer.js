const express = require('express'),
    users = express.Router(),
    mysql = require('mysql'),
    db = require('../../config/database.js'),
    Computers = require('./computers.js');


class DesktopComputer extends Computers {
    constructor(product){
        super(product);
    }

    create(){
        let that = this;
        return new Promise(function(resolve, reject) {
            db.getConnection((err, connection) => {
                var desktopComputer = {
                    Discriminator: "desktopcomputer",
                    ProductName : that.productName,
                    BrandName : that.brandName,
                    ModelNumber: that.modelNumber,
                    Dimensions: that.dimensions,
                    Price: that.price,
                    Weight: that.weight,
                    ProcessorType: that.processorType,
                    RAMSize: that.RAMSize,
                    NumberOfCores: that.numberOfCores,
                    HardDriveSize: that.hardDriveSize
                }

                //Build query and add new product in the db
                let sql = `INSERT INTO models SET ?`;
                connection.query(sql, desktopComputer, (err, result) => {
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
                    }
                });
            });
        });
    }
}

module.exports = DesktopComputer;
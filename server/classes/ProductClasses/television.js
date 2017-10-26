const express = require('express'),
    users = express.Router(),
    mysql = require('mysql'),
    db = require('../../config/database.js'),
    ProductDescription = require('./productDescription.js');


class Television extends ProductDescription {
    constructor(product){
     super(product);
     this.televisionType = product.televisionType;
    }

    create(){
        let that = this;
        return new Promise(function(resolve, reject) {
            db.getConnection((err, connection) => {
                var television = {
                    Discriminator: "television",
                    ProductName : that.productName,
                    BrandName : that.brandName,
                    ModelNumber: that.modelNumber,
                    Dimensions: that.dimensions,
                    Price: that.price,
                    Weight: that.weight,
                    TelevisionType: that.televisionType
                }

                //Build query and add new product in the db
                let sql = `INSERT INTO models SET ?`;
                connection.query(sql, television, (err, result) => {
                    if (err){
                        console.log(err);
                        return reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        });

    }
}

module.exports= Television;
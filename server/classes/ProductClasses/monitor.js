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
        db.getConnection((err, connection) => {
            var monitor = {
                Discriminator : "Monitor",
                ProductName : this.productName,
                BrandName : this.brandName,
                ModelNumber: this.modelNumber,
                Dimensions: this.dimensions,
                Price: this.price,
                Weight: this.weight,
                Size: this.size
            }

            //Build query and add new product in the db
            let sql = `INSERT INTO models SET ?`;
            connection.query(sql, monitor, (err, result) => {
                if(err){
                    console.log(err);
                    return false;
                }
                else{
                    console.log("The product has been added to the db with the following result message: \n\t" + result);
                    return true;
                }
            });
        });


    }
}

module.exports = Monitor;
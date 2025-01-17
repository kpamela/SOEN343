const express = require('express'),
    users = express.Router(),
    mysql = require('mysql'),
    db = require('../../../data-source/config/database.js'),
    ProductDescription = require('./ProductDescription.js');


class Television extends ProductDescription {
    constructor(product){
     super(product);
     this.televisionType = product.televisionType;
    }

    create(){
        db.getConnection((err, connection) => {
            var television = {
                ProductName : this.productName,
                BrandName : this.BrandName,
                ModelNumber: this.ModelNumber,
                Dimensions: this.Dimensions,
                Price: this.Price,
                Weight: this.Weight,
                TelevisionType: this.televisionType
            }

            //Build query and add new product in the db
            let sql = `INSERT INTO models SET ?`;
            connection.query(sql, television, (err, result) => {
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

module.exports= Television;
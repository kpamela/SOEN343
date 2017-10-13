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
        db.getConnection((err, connection) => {
            var television = {
                ProductName : this.productName,
                BrandName : this.brandName,
                ModelNumber: this.modelNumber,
                Dimensions: this.dimensions,
                Price: this.price,
                Weight: this.weight,
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
                    return true;
                }
            });
        });




    }
}

module.exports= Television;
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
        db.getConnection((err, connection) => {
            var desktopComputer = {
                Discriminator : "DesktopComputer",
                ProductName : this.productName,
                BrandName : this.brandName,
                ModelNumber: this.modelNumber,
                Dimensions: this.dimensions,
                Price: this.price,
                Weight: this.weight,
                ProcessorType: this.processorType,
                RAMSize: this.RAMSize,
                NumberOfCores: this.numberOfCores,
                HardDriveSize: this.hardDriveSize
            }

            //Build query and add new product in the db
            let sql = `INSERT INTO models SET ?`;
            connection.query(sql, desktopComputer, (err, result) => {
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

module.exports = DesktopComputer;
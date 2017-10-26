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
                    resolve(result);
                }
            });
        });
    }
}

module.exports = DesktopComputer;
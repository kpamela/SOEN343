const express = require('express'),
    users = express.Router(),
    mysql = require('mysql'),
    db = require('../../config/database.js'),
    Computers = require('./computers.js');


class TabletComputer extends Computers {
    constructor(product){
        super(product);
        this.displaySize = product.displaySize;
        this.batteryInfo = product.batteryInfo;
        this.cameraInfo = product.cameraInfo;
        this.operatingSystem = product.operatingSystem;
    }

    create(){
        let that = this;
        return new Promise(function(resolve, reject) {
            db.getConnection((err, connection) => {
                var tabletComputer = {
                    Discriminator: "tabletcomputer",
                    ProductName : that.productName,
                    BrandName : that.brandName,
                    ModelNumber: that.modelNumber,
                    Dimensions: that.dimensions,
                    Price: that.price,
                    Weight: that.weight,
                    ProcessorType: that.processorType,
                    RAMSize: that.RAMSize,
                    NumberOfCores: that.numberOfCores,
                    HardDriveSize: that.hardDriveSize,
                    DisplaySize: that.displaySize,
                    CameraInfo: that.cameraInfo,
                    BatteryInfo: that.batteryInfo,
                    OperatingSystem: that.operatingSystem
                }

                //Build query and add new product in the db
                let sql = `INSERT INTO models SET ?`;
                connection.query(sql, tabletComputer, (err, result) => {
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

module.exports = TabletComputer;
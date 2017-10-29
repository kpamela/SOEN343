const express = require('express'),
    users = express.Router(),
    mysql = require('mysql'),
    db = require('../../../data-source/config/database.js'),
    Computers = require('./Computers.js');


class LaptopComputer extends Computers {
    constructor(product){
        super(product);
        if(product.description){
            this.DisplaySize = product.description.displaySize;
            this.BatteryInfo = product.description.batteryInfo;
            this.HasCamera = product.description.hasCamera;
            this.OperatingSystem = product.description.operatingSystem;
        }
        else{
            this.DisplaySize = product.description.DisplaySize;
            this.BatteryInfo = product.description.BatteryInfo;
            this.HasCamera = product.description.HasCamera;
            this.OperatingSystem = product.description.OperatingSystem;
        }
    }


}

module.exports = LaptopComputer;
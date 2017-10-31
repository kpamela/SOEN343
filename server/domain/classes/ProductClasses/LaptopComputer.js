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
            this.HadCamera = product.description.hasCamera;
            this.OperatingSystem = product.description.operatingSystem;
        }
        else{
            this.DisplaySize = product.DisplaySize;
            this.BatteryInfo = product.BatteryInfo;
            this.HadCamera = product.HasCamera;
            this.OperatingSystem = product.OperatingSystem;
        }
    }


}

module.exports = LaptopComputer;
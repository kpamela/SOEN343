const express = require('express'),
    users = express.Router(),
    mysql = require('mysql'),
    db = require('../../../data-source/config/database.js'),
    Computers = require('./Computers.js');


class LaptopComputer extends Computers {
    constructor(product){
        super(product);
        this.DisplaySize = product.description.displaySize;
        this.BatteryInfo = product.description.batteryInfo;
        this.HasCamera = product.description.hasCamera;
        this.OperatingSystem = product.description.operatingSystem;
    }


}

module.exports = LaptopComputer;
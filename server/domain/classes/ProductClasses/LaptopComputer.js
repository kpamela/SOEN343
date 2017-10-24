const express = require('express'),
    users = express.Router(),
    mysql = require('mysql'),
    db = require('../../../data-source/config/database.js'),
    Computers = require('./Computers.js');


class LaptopComputer extends Computers {
    constructor(product){
        super(product);
        this.displaySize = product.description.displaySize;
        this.batteryInfo = product.description.batteryInfo;
        this.hasCamera = product.description.hasCamera;
        this.operatingSystem = product.description.operatingSystem;
    }


}

module.exports = LaptopComputer;
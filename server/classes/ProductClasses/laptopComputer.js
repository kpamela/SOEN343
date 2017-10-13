const express = require('express'),
    users = express.Router(),
    mysql = require('mysql'),
    db = require('../../config/database.js'),
    Computers = require('./computers.js');


class LaptopComputer extends Computers {
    constructor(product){
        super(product);
        this.displaySize = product.display;
        this.batteryInfo = product.batteryInfo;
        this.hadCamera = product.hadCamera;
        this.operatingSystem = product.operatingSystem;
    }
}

module.exports = LaptopComputer;
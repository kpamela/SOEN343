const express = require('express'),
    users = express.Router(),
    mysql = require('mysql'),
    db = require('../../config/database.js'),
    Computers = require('./computers.js');


class TabletComputer extends Computers {
    constructor(product){
        super();
        this.displaySize = product.displaySize;
        this.batteryInfo = product.batteryInfo;
        this.cameraInfo = product.cameraInfo;
        this.operatingSystem = product.operatingSystem;
    }
}

module.exports(TabletComputer);
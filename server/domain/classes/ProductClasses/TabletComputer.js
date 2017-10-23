const express = require('express'),
    Computers = require('./Computers.js');


class TabletComputer extends Computers {
    constructor(product){
        super(product);
        this.displaySize = product.description.displaySize;
        this.batteryInfo = product.description.batteryInfo;
        this.cameraInfo = product.description.cameraInfo;
        this.operatingSystem = product.description.operatingSystem;
    }


}

module.exports = TabletComputer;
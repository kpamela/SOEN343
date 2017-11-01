const express = require('express'),
    Computers = require('./Computers.js');


class TabletComputer extends Computers {
    constructor(product){
        super(product);
        if(product.description){
            this.DisplaySize = product.description.displaySize;
            this.BatteryInfo = product.description.batteryInfo;
            this.CameraInfo = product.description.cameraInfo;
            this.OperatingSystem = product.description.operatingSystem;
        }
    }


}

module.exports = TabletComputer;
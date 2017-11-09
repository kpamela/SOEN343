const express = require('express'),
    Computers = require('./Computers.js');


class TabletComputer extends Computers {
    constructor(product){
        super(product);
        if(product.description){
            if(product.description){
                this.DisplaySize = product.description.displaySize;
                this.BatteryInfo = product.description.batteryInfo;
                this.CameraInfo = product.description.cameraInfo;
                this.OperatingSystem = product.description.operatingSystem;
            }
            else{
                this.DisplaySize = product.DisplaySize;
                this.BatteryInfo = product.BatteryInfo;
                this.CameraInfo = product.CameraInfo;
                this.OperatingSystem = product.OperatingSystem;
            }
        }
    }


}

module.exports = TabletComputer;
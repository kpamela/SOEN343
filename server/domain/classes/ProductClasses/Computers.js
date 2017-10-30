const express = require('express'),
    ProductDescription = require('./ProductDescription.js');


class Computers extends ProductDescription {
    constructor(product){
        super(product);
        if(product.description){
            this.ProcessorType = product.description.processorType;
            this.RAMSize = product.description.RAMSize;
            this.NumberOfCores = product.description.numberOfCores;
            this.HardDriveSize = product.description.hardDriveSize;
        }
        else{
            this.ProcessorType = product.ProcessorType;
            this.RAMSize = product.RAMSize;
            this.NumberOfCores = product.NumberOfCores;
            this.HardDriveSize = product.HardDriveSize;
        }
    }
}

module.exports= Computers;
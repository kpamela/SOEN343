const express = require('express'),
    ProductDescription = require('./ProductDescription.js');


class Computers extends ProductDescription {
    constructor(product){
        super(product);
        this.ProcessorType = product.description.processorType;
        this.RAMSize = product.description.RAMSize;
        this.NumberOfCores = product.description.numberOfCores;
        this.HardDriveSize = product.description.hardDriveSize;
    }
}

module.exports= Computers;
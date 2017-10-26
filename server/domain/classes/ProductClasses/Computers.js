const express = require('express'),
    ProductDescription = require('./ProductDescription.js');


class Computers extends ProductDescription {
    constructor(product){
        super(product);
        this.processorType = product.description.processorType;
        this.RAMSize = product.description.RAMSize;
        this.numberOfCores = product.description.numberOfCores;
        this.hardDriveSize = product.description.hardDriveSize;
    }
}

module.exports= Computers;
const express = require('express'),
    users = express.Router(),
    mysql = require('mysql'),
    db = require('../../config/database.js'),
    ProductDescription = require('./productDescription.js');


class Computers extends ProductDescription {
    constructor(product){
        super();
        this.processorType = product.processorType;
        this.RAMSize = product.RAMSize;
        this.numberOfCores = product.numberOfCores;
        this.hardDriveSize = product.hardDriveSize;
    }
}

module.exports(Computers);
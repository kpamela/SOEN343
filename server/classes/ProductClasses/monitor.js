const express = require('express'),
    users = express.Router(),
    mysql = require('mysql'),
    db = require('../../config/database.js'),
    ProductDescription = require('./productDescription.js');


class Monitor extends ProductDescription {
    constructor(product){
        super();
        this.size = product.size;
    }
}

module.exports(Monitor);
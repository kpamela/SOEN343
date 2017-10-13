const express = require('express'),
    users = express.Router(),
    mysql = require('mysql'),
    db = require('../../config/database.js'),
    ProductDescription = require('./productDescription.js');


class Television extends ProductDescription {
    constructor(product){
     super();
     this.televisionType = product.televisionType;
    }
}

module.exports(Television);
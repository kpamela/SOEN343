const express = require('express'),
    users = express.Router(),
    mysql = require('mysql'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    db = require('../../../data-source/config/database.js');

class ProductDescription{
    constructor(product){
        this.productName = " ";
        this.brandName = product.brandName;
        this.modelNumber = product.modelNumber;
        this.dimensions = product.dimensions;
        this.price = product.price;
        this.amountRemaining = product.amountRemaining;
        this.weight = product.weight;
    }

}

module.exports = ProductDescription;
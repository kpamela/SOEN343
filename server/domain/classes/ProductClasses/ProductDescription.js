const express = require('express'),
    users = express.Router(),
    mysql = require('mysql'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    db = require('../../../data-source/config/database.js');

class ProductDescription{
    constructor(product){
        this.productName = " ";
        this.brandName = product.description.brandName;
        this.modelNumber = product.description.modelNumber;
        this.dimensions = product.description.dimensions;
        this.price = product.description.price;
        this.weight = product.description.weight;
        this.additionalInfo = product.description.additionalInfo;
        this.amount = product.amount;
        this.category = product.category;

        this.producIds = this.setProductIds(this.amount);
    }

    /**
     * TODO Create product ids
     * @param amount
     * @returns {Array}
     */
    setProductIds(amount){
        let arr = [];

        for(let i = 0; i < amount; i++){
            arr[i] = this.modelNumber + "_" + i;
        }

        return arr;
    }

}

module.exports = ProductDescription;
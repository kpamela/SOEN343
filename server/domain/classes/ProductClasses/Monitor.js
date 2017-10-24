const express = require('express'),
    ProductDescription = require('./ProductDescription.js');


class Monitor extends ProductDescription {
    constructor(product){
        super(product);
        this.size = product.description.size;
    }

}

module.exports = Monitor;
const express = require('express'),
    ProductDescription = require('./ProductDescription.js');


class Monitor extends ProductDescription {
    constructor(product){
        super(product);
        this.Size = product.description.size;
    }

}

module.exports = Monitor;
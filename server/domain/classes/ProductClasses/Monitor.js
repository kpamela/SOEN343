const express = require('express'),
    ProductDescription = require('./ProductDescription.js');


class Monitor extends ProductDescription {
    constructor(product){
        super(product);
        if(product.description){
            this.Size = product.description.size;
        }
        else{
            this.Size = product.Size;
        }
    }

}

module.exports = Monitor;
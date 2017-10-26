const express = require('express'),
    Computers = require('./Computers.js');


class DesktopComputer extends Computers {
    constructor(product){
        super(product);
    }


}

module.exports = DesktopComputer;
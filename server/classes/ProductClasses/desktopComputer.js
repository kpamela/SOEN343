const express = require('express'),
    users = express.Router(),
    mysql = require('mysql'),
    db = require('../../config/database.js'),
    Computers = require('./computers.js');


class DesktopComputer extends Computers {
    constructor(product){
        super(product);
    }
}

module.exports = DesktopComputer;
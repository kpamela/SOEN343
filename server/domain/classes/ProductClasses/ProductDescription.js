const express = require('express'),
    users = express.Router(),
    mysql = require('mysql'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    db = require('../../../data-source/config/database.js');

const _NEW = 2;
const _DIRTY = 1;
const _CLEAN = 0;
const _DELETED = -1;

let _flag = _CLEAN;


class ProductDescription{

    get flag(){
        return _flag;
    }


    constructor(product){

        this.BrandName = product.description.brandName;
        this.ModelNumber = product.description.modelNumber;
        this.Dimensions = product.description.dimensions;
        this.Price = product.description.price;
        this.Weight = product.description.weight;
        this.AdditionalInfo = product.description.additionalInfo;
        this.Amount = product.amount;
        this.Category = product.category;

        this.productIds = this.setProductIds(this.amount);

        this.setNew();
    }

    setDescription(ob1){

    }


    setDirty(){
        _flag = _DIRTY;
    }

    setNew(){
        _flag = _NEW;
    }

    setClean(){
        _flag = _CLEAN;
    }
    setDeleted(){
        _flag = _DELETED;
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
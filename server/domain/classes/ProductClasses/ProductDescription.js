const express = require('express'),
    ProductId = require('./ProductId.js'),
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

let _usedIds = [];


class ProductDescription{

    get flag(){
        return _flag;
    }


    constructor(product){

        if(product.description){
            this.BrandName = product.description.brandName;
            this.ModelNumber = product.description.modelNumber;
            this.Dimensions = product.description.dimensions;
            this.Price = product.description.price;
            this.Weight = product.description.weight;
            //this.AdditionalInfo = product.description.additionalInfo;
            this.Amount = product.amount;
            this.Category = product.category;
        }
        else{
            this.BrandName = product.BrandName;
            this.ModelNumber = product.ModelNumber;
            this.Dimensions = product.Dimensions;
            this.Price = product.Price;
            this.Weight = product.Weight;
            //this.AdditionalInfo = product.AdditionalInfo;
            this.Amount = product.Amount;
            this.Category = product.Category;
        }


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
     * Restores a specific product id
     * @param serial
     */
    restoreId(serial){
        for(let i = 0; i< _usedIds.length; i++){
            if(_usedIds[i].SerialNumber == serial){
                _usedIds[i].Available = false;
                _usedIds.splice(i, 1);
                this.Amount++;
                break;
            }
        }
    }

    /**
     *
     * @param {ProductId} id
     */
    addToUsedIds(id){
        _usedIds.push(id);
        this.Amount--;
    }

}

module.exports = ProductDescription;
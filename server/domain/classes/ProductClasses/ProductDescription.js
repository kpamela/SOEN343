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

let _productIds = [];
let _lockedIds = [];


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

        this.setNewProductIds(this.Amount);

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
     */
    setNewProductIds(amount){
        _productIds = [];

        for(let i = 0; i < amount; i++){
            let serial = this.ModelNumber + "_" + i;
            _productIds[i] = new ProductId(this.ModelNumber, serial);
        }
    }

    /**
     * Gets a list of product ids and sets the current product id list
     * @param list
     */
    setProducIds(list){
        _productIds = list;
    }

    /**
     * Returns a product id from the list
     * stores it in locked list
     * @returns {*}
     */
    getProductId(){
        let id = _productIds.pop();
        id.Locked = true;
        _lockedIds.push(id);
        this.Amount--;

        return id;
    }

    /**
     * Restores a specific product id
     * @param serial
     */
    restoreId(serial){
        for(let i = 0; i< _lockedIds.length; i++){
            if(_lockedIds[i].SerialNumber == serial){
                _lockedIds[i].Locked = false;
                _productIds.push(_lockedIds[i]);
                _lockedIds.splice(i, 1);
                this.Amount++;
                break;
            }
        }
    }

}

module.exports = ProductDescription;
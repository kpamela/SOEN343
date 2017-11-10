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

let flag = Symbol();

let unusedIds = Symbol();//truly private fields
let usedIds = Symbol();//tryly privatefields
class ProductDescription{



    get flag(){
        return this[flag];
    }


    constructor(product){

        /*
        Private properties
         */
        this[flag] = _CLEAN;
        this[unusedIds] = [];
        this[usedIds] = [];

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



    setDirty(){
        this[flag] = _DIRTY;
    }

    setNew(){
        this[flag] = _NEW;
    }

    setClean(){
        this[flag] = _CLEAN;
    }
    setDeleted(){
        this[flag] = _DELETED;
    }




    /**
     * Restores a specific product id
     * @param serial
     */
    restoreId(serial){
        for(let i = 0; i< this[usedIds].length; i++){
            if(this[usedIds][i].SerialNumber == serial){
                this[usedIds][i].Available = 1;
                this[unusedIds].push(this[usedIds][i]);
                this[usedIds].splice(i, 1);
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
        id.Available = 0;
        this[usedIds].push(id);
    }

    /**
     *
     * @param id
     */
    addToUnusedIds(id){
        id.Available = 1;
        this[unusedIds].push(id);
    }

    /**
     *
     * @param arr
     */
    setUnusedIds(arr){
        this[unusedIds] = [];//set to empty before
        for(let i = 0; i<arr.length; i++){
            this[unusedIds].push(new ProductId(arr[i], this.Price));
        }
        console.log(this[unusedIds]);
        this.Amount = this[unusedIds].length;
    }

    /**
     *
     * @returns {*}
     */
    popUnusedId(){
        let id = this[unusedIds].pop();
        id.Available = 0;
        this.addToUsedIds(id);
        this.Amount--;
        return id;
    }

    /**
     *
     * @returns {boolean}
     */
    hasUnusedIds(){
        return this[unusedIds].length > 0;
    }

    /**
     *
     * @returns {boolean}
     */
    hasUsedIds(){
        return this[usedIds].length >0;
    }

    /**
     * Used as a background check
     * Checks in the list of usedIds if there are any available ids
     * Would occur if a user logs out with a full shopping cart
     *
     */
    checkForReleasedIds(){
        for(let i = 0; i < this[usedIds].length; i++){
            let id = this[usedIds][i];
            if(id.Available === 1){
                this[usedIds].splice(i, 1);//remove from usedlist
                this[unusedIds].push(id);
            }
        }
        this.Amount = this[unusedIds].length;
    }

}

module.exports = ProductDescription;
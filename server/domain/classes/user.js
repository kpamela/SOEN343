const express = require('express'),
    ShoppingCart = require('../IdentityMaps/ShoppingCart.js');

/**
 * Private instance of shopping cart
 */
let cart = Symbol();
let purchases = Symbol();

class User{
    constructor(user){
        this.Username       = user.Username;
        this.Password       = user.Password;
        this.FirstName      = user.FirstName;
        this.LastName       = user.LastName;
        this.EmailAddress   = user.EmailAddress;
        this.PhoneNumber    = user.PhoneNumber;
        this.Administrator  = user.Administrator;
        this.Apt            = user.Apt;
        this.StreetNumber   = user.StreetNumber;
        this.Street         = user.Street;
        this.City           = user.City;
        this.ZIP            = user.ZIP;
        this.Country        = user.Country;

        //private instance of shoppingcart
        this[cart] = new ShoppingCart();
        this[purchases] = [];
    }

    /**
     *
     */
    getCart(){
        return this[cart].content;
    }

    getTimeStamps(){
        return this[cart].timestamps;
    }

    /**
     *
     * @param {ProductId} product
     */
    addToCart(product){
        return this[cart].add(product);
    }


    /**
     *Returns and removes instance of product id in the cart
     * @param {ProductId} serial
     * @return {ProductId} item
     */
    removeFromCart(serial){
        let item = this[cart].getItem(serial);
        this[cart].removeItem(serial);
        return item;
    }

    getPurchaseHistory(){
        return this[purchases];
    }

    getPurchaseSerialNumber(serial){

        for(let i = 0; i < this[purchases].length; i++){
            if(this[purchases][i].SerialNumber === serial){
                return this[purchases][i];
            }
        }
        return null;
    }

    addPurchase(purchase){
        this[purchases].push(purchase);
    }

    setPurchaseHistory(history){
        this[purchases] = history;
    }

}

module.exports = User;

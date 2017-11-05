const express = require('express'),
    ShoppingCart = require('../IdentityMaps/ShoppingCart.js');

/**
 * Private instance of shopping cart
 */
let _cart = new ShoppingCart();

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
    }

    getCart(){
        return _cart.content;
    }

    /**
     *
     * @param {ProductId} product
     */
    addToCart(product){
        _cart.add(product);
    }


    /**
     *Returns and removes instance of product id in the cart
     * @param {ProductId} serial
     * @return {ProductId} item
     */
    removeFromCart(serial){
        let item = _cart.getItem(serial);
        _cart.removeItem(serial);
        return item;
    }

}

module.exports = User;

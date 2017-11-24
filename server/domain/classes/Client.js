/**
 * Created by CharlesPhilippe on 2017-11-12.
 */
const User = require("./user.js"),
    ShoppingCart = require('../IdentityMaps/ShoppingCart.js');


/**
 * Private instance of shopping cart
 */
let cart = Symbol();
let purchases = Symbol();


module.exports = class Client extends User{

    constructor(user){
        super(user);

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

    getPurchasedSerialNumber(serial){

        for(let i = 0; i < this[purchases].length; i++){
            if(this[purchases][i].SerialNumber === serial){
                return this[purchases][i];
            }
        }
        return null;
    }

    getPurchased(purchaseId){
        for(let i = 0; i < this[purchases].length; i++){
            if(this[purchases][i].PurchaseID === purchaseId){
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



};
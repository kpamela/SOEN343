/**
 * Created by CharlesPhilippe on 2017-10-22.
 */
const express = require('express'),
    ClassBasedRouter = require('express-class-router'),
  //  products = express.Router(),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    ProductTDG = require('../../data-source/TDG/ProductTDG'),
    DesktopComputer =  require('../classes/ProductClasses/DesktopComputer'),
    LaptopComputer = require('../classes/ProductClasses/LaptopComputer'),
    TabletComputer = require('../classes/ProductClasses/TabletComputer'),
    Monitor = require('../classes/ProductClasses/Monitor.js'),
    UnitOfWork = require('../UnitOfwork.js'),
    ProductsIdentityMap = require('../IdentityMaps/ProductsIdentityMap');

/**
 * ProductListing is common to all catalogues
 * @type {[*]}
 * @private
 */
//TODO make that a jquery deferred object, maybe
let _productListing = new ProductsIdentityMap();

// [{category: "Monitor", description: {modelNumber: "222", price: 22, dimensions: 222, weight: 22, brandName: "22"}, amount: "2"}]
/**
 * Unit of work is common to all catalogues
 */
let _unitOfWork = new UnitOfWork();

/**
 * Based on express-class-router
 * @type {CatalogueMapper}
 */

module.exports = class CatalogueMapper extends ClassBasedRouter{



    get middlewares(){
        return [
            ['GET','/', 'middleware']
        ]
    }

    get routes(){
        return[
            ['GET','/view', 'view']
        ]
    }

    /**
     * Product listing is common to all catalogues
     * @returns {*[]}
     */
    static get productListing(){
        return _productListing;
    }

    /**
     *
     * @returns {*}
     */
    static get unitOfWork(){
        return _unitOfWork;
    }
   /* static set productListing(p){
        this.productListing.push(p);
    }

*/
   constructor(options={}) {
        super(options);
       // this.productListing = [{category: "Monitor", description: {modelNumber: "222", price: 22, dimensions: 222, weight: 22, brandName: "22"}, amount: "2"}];
        let test = new Monitor({category: "Monitor", description: {modelNumber: "222", price: 22, dimensions: 222, weight: 22, brandName: "22"}, amount: 2});
        CatalogueMapper.productListing.add(test);


        this.register(this.middlewares);
        this.register(this.routes);

       this.view = this.view.bind(this);
       this.middleware = this.middleware.bind(this);
    }

    static authorizeToken(token){
        if(!token){
            return {success: false, msg: "Unauthorized: No Token Provided"};
        }

        return jwt.verify(token, 'mysecret', function(err, decoded) {
            if (err) {
                return {success: false, msg: "Unauthorized: Incorrect Token Signature"};
            }
            else {
                return {success: true};
            }
        });

    }


    //TODO middleware
    middleware(req, res, next){
        console.log('middleware triggered!');
        next();
    }

    //TODO view route
    view(req, res) {
        const authorization = CatalogueMapper.authorizeToken(req.headers.authorization);

        if(!authorization.success){
            return res.status(401).json(authorization);
        }
        else{
            //TODO proper tdg and identyMap calls

           // ProductTDG.SQLget_product_All();
            return res.send(CatalogueMapper.productListing.content);

        }

    }


};
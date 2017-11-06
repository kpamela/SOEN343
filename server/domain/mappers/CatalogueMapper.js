/**
 * Created by CharlesPhilippe on 2017-10-22.
 */
const express = require('express'),
    ClassBasedRouter = require('express-class-router'),
  //  products = express.Router(),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    ProductTDG = require('../../data-source/TDG/ProductTDG.js'),
    ModelTDG = require('../../data-source/TDG/ModelTDG.js'),
    DesktopComputer =  require('../classes/ProductClasses/DesktopComputer'),
    LaptopComputer = require('../classes/ProductClasses/LaptopComputer'),
    TabletComputer = require('../classes/ProductClasses/TabletComputer'),
    Monitor = require('../classes/ProductClasses/Monitor.js'),
    UnitOfWork = require('../UnitOfWork.js'),
    ProductsIdentityMap = require('../IdentityMaps/ProductsIdentityMap');
const aspect = require('aspect-js');
const meld = require('meld');
const trace = require('meld/aspect/trace');

/**
 * ProductListing is common to all catalogues
 * @type {ProductsIdentityMap}
 * @private
 */
//TODO make that a jquery deferred object, maybe
let _productListing = new ProductsIdentityMap();

/**
 *
 * @type {ModelTDG}
 */
let modelTDG = new ModelTDG();
let productTDG = new ProductTDG();

/**
 * Unit of work is common to all catalogues
 */
let _unitOfWork = new UnitOfWork();


/**
 * Based on express-class-router
 * @type {CatalogueMapper}
 */

module.exports = class CatalogueMapper{


    /**
     * Product listing is common to all catalogues
     * @returns {ProductsIdentityMap}
     */
    static get productListing(){
        return _productListing;
    }

    /**
     *
     * @returns {UnitOfWork}
     */
    static get unitOfWork(){
        return _unitOfWork;
    }

     static get modelTDG(){
        return modelTDG
    }

    static get productTDG(){
         return productTDG;
    }

   constructor() {
        //let traced =  meld(this, 'router', trace());
       this.view = this.view.bind(this);

    }





    /**
     *If the productListing isn't set, set it to the content of the database
     * Else, simply return the current product listing
     *
     * This follows that the productListing is static, and should always match the content of the Database
     * Plus the changes in AdminDashboardMapper if there is any.
     * @param req
     * @param res
     */
     view(req, res) {

        modelTDG.SQLget_models_All().then(function(response){
            return res.send(response.content);
        });

    }




    /**
     * Instantiate and return a product created from a category, and an already existing product
     * @param category
     * @param product
     * @returns {*}
     */
    static addNewProduct(category, product){
        switch(category){
            case 'DesktopComputer':
                return new DesktopComputer(product);

            case 'TabletComputer':
                return new TabletComputer(product);

            case 'LaptopComputer':
                return new LaptopComputer(product);

            case 'Monitor':
                return new Monitor(product);

        }
    }


};

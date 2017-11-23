/**
 * Created by CharlesPhilippe on 2017-10-22.
 */
const express = require('express'),
    ProductTDG = require('../../data-source/TDG/ProductTDG.js'),
    ModelTDG = require('../../data-source/TDG/ModelTDG.js'),
    UserTDG = require('../../data-source/TDG/userTDG.js'),
    UnitOfWork = require('../UnitOfWork.js');


/**
 *
 * @type {ModelTDG}
 */
let modelTDG = new ModelTDG();
/**
 *
 * @type {ProductTDG}
 */
let productTDG = new ProductTDG();
/**
 *
 * @type {UserTDG}
 */
let userTDG = new UserTDG();
/**
 * Unit of work is common to all catalogues
 */
let _unitOfWork = new UnitOfWork();


/**
 *
 * @type {CatalogueMapper}
 */

module.exports = class CatalogueMapper{


    /**
     *
     * @returns {UnitOfWork}
     */
    static get unitOfWork(){
        return _unitOfWork;
    }

    /**
     *
     * @returns {ModelTDG}
     */
     static get modelTDG(){
        return modelTDG
    }

    /**
     * @returns {ProductTDG}
     */
    static get productTDG(){
         return productTDG;
    }

    /**
     *
     * @returns {UserTDG}
     */
    static get userTDG(){
        return userTDG;
    }

   constructor() {
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



};

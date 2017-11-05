/**
 * Created by CharlesPhilippe on 2017-10-23.
 */
const Catalogue = require('./CatalogueMapper.js'),
    UserMapper = require('./UserMapper.js'),
    ProductId = require('../classes/ProductClasses/ProductId.js'),
    ProductTDG = require('../../data-source/TDG/ProductTDG'),
    UserTDG = require('../../data-source/TDG/userTDG.js'),
    DesktopComputer =  require('../classes/ProductClasses/DesktopComputer'),
    LaptopComputer = require('../classes/ProductClasses/LaptopComputer'),
    TabletComputer = require('../classes/ProductClasses/TabletComputer'),
    Monitor = require('../classes/ProductClasses/television');

let productTDG = new ProductTDG();
let userTDG = new UserTDG();

module.exports = class ClientDashboardMapper extends Catalogue{

    static get userTDG(){
        return userTDG;
    }
    static get productTDG(){
        return productTDG;
    }

    constructor() {
        super();

    }

    /**
     * Adds an item to the cart of specified user
     *
     * @param req
     * @param res
     */
    addToCart(req, res){

            //getting user from TDG
            userTDG.SQLget_users(req.body.username).then(function(response){
                let user = response;
                //instantiating product id with results, putting in the user
                // places id to locked ids and returns a product Id
                productTDG.SQLgetSingle_products(req.body.modelNumber).then(function(response){
                    if(!response){
                        //empty
                        return res.status(500).send('Products list is empty')
                    }
                    else{
                        let id = response;

                        //add productId to cart of user
                        user.addToCart(id);

                        res.json(id);
                    }
                });
            });
    }


    /**
     * Removes a specified product from the specified user's cart
     * @param req
     * @param res
     */
    removeFromCart(req, res){

        //getting user from TDG
        userTDG.SQLget_users(req.body.username).then(function(response){
            let user = response;
            //removes and returns specified serial number of the cart
            let id = user.removeFromCart(req.body.serialNumber);
        });


    }



};
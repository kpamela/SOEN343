/**
 * Created by CharlesPhilippe on 2017-10-23.
 */
const Catalogue = require('./CatalogueMapper.js'),
    UserMapper = require('./UserMapper.js'),
    ProductId = require('../classes/ProductClasses/ProductId.js'),
    ProductTDG = require('../../data-source/TDG/ProductTDG'),
    DesktopComputer =  require('../classes/ProductClasses/DesktopComputer'),
    LaptopComputer = require('../classes/ProductClasses/LaptopComputer'),
    TabletComputer = require('../classes/ProductClasses/TabletComputer'),
    Monitor = require('../classes/ProductClasses/television');

let productTDG = new ProductTDG();

module.exports = class ClientDashboardMapper extends Catalogue{

    //TODO
    get middlewares(){
        return super.middlewares;
    }

    //TODO
   /* get routes(){
        return super.routes.concat([
            ['post','/addToCart','addToCart'],
            ['post','/removeFromCart','removeFromCart']])

    }
*/
    constructor(options={}) {
        super(options);

    }

    /**
     * Adds an item to the cart of specified user
     *
     * @param req
     * @param res
     */
    addToCart(req, res){

            //getting user from usersRegistry
            let user = UserMapper.activeUsersRegistry.getUser(req.body.username);


            //looking for the specified model in productListing
            if(ClientDashboardMapper.productListing.findModel(req.body.modelNumber) == -1){
                return res.status(500).send("product not found");
            }
            else{
                //instance of specified model
                let product = ClientDashboardMapper.productListing.getModel(req.body.modelNumber);
                //TODO test this out
                //TODO TDG calls with products table
                //instantiating product id with results, putting in the user
                // places id to locked ids and returns a product Id
                productTDG.SQLgetSingle_products(product.ModelNumber).then(function(response){
                    let id = new ProductId(response);
                    product.addToUsedIds(id);
                    //add productId to cart of user
                    user.addToCart(id);

                    res.json(id);
                });

            }


    }


    /**
     * Removes a specified product from the specified user's cart
     * @param req
     * @param res
     */
    removeFromCart(req, res){

            //getting the user from users Registry
            let user = UserMapper.activeUsersRegistry.getUser(req.body.username);

            //removes and returns specified serial number of the cart
            let id = user.removeFromCart(req.body.serialNumber);

            //instance of the specified model number
            let product = ClientDashboardMapper.productListing.getModel(req.body.modelNumber);
            //TODO test this out
            //unlocks productId and place it in available productid list
            product.restoreId(id.SerialNumber);


    }



};
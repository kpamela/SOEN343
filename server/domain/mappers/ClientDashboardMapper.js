/**
 * Created by CharlesPhilippe on 2017-10-23.
 */
const Catalogue = require('./CatalogueMapper.js'),
    UserMapper = require('./UserMapper.js'),
    ProductId = require('../classes/ProductClasses/ProductId.js'),
    PurchaseHistory = require('../../data-source/TDG/PurchaseHistory.js'),
    ProductTDG = require('../../data-source/TDG/ProductTDG'),
    UserTDG = require('../../data-source/TDG/userTDG.js'),
    DesktopComputer =  require('../classes/ProductClasses/DesktopComputer'),
    LaptopComputer = require('../classes/ProductClasses/LaptopComputer'),
    TabletComputer = require('../classes/ProductClasses/TabletComputer'),
    Monitor = require('../classes/ProductClasses/television');


let purchases = new PurchaseHistory();


/**
 *
 * @type {ClientDashboardMapper}
 */
module.exports = class ClientDashboardMapper extends Catalogue{

    static get purchases(){
        return purchases;
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
            console.log(req.body.username);
            //getting user from TDG
            ClientDashboardMapper.userTDG.SQLget_users(req.body.username).then(function(response){
                let user = response;
                //instantiating product id with results, putting in the user
                // places id to locked ids and returns a product Id
                ClientDashboardMapper.productTDG.SQLgetSingle_products(req.body.modelNumber).then(function(response){
                    if(!response){
                        //empty
                        return res.status(500).send('Products list is empty')
                    }
                    else{
                        let id = response;
                        if(user.getCart().length < 7){
                            user.addToCart(id);
                            console.log(user.getCart());
                            res.json({success: true, id: id, timeStamp: user.getTimeStamps()[id.SerialNumber]});
                        }
                        else{
                            id.Available = 1;
                            res.json({success: false, error: "can't add more then seven items to cart"})
                        }

                        //add productId to cart of user
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
        ClientDashboardMapper.userTDG.SQLget_users(req.body.username).then(function(response){
            let user = response;
            //removes and returns specified serial number of the cart
            let id = user.removeFromCart(req.body.serialNumber);
            console.log(user.getCart());
            res.json(id);
        });


    }

    /**
     * Getting and returning the user's cart
     * @param req
     * @param res
     */
    getShoppingCart(req, res){

        ClientDashboardMapper.userTDG.SQLget_users(req.query.username).then(function(response){
            let user = response;

            res.json({cart: user.getCart(), timestamps: user.getTimeStamps()});
        });
    }

    /**
     * Puts items in purchase history
     * and delete them from the db
     * @param req
     * @param res
     */
    completeTransaction(req, res){

        ClientDashboardMapper.userTDG.SQLget_users(req.body.username).then(function(response){
            let user = response;
            let cart = user.getCart();

            for(let i = 0; i < cart.length; i++){
                let purchase = {Username: user.Username,
                    ModelNumber: cart[i].ModelNumber,
                    SerialNumber: cart[i].SerialNumber,
                    IsReturned: 0,
                    PurchaseTimeStamp: Date.now()};
                user.addPurchase(purchase);
                purchases.SQLadd_purchases(purchase).then(function(response){
                    ClientDashboardMapper.productTDG.SQLdeleteSingle_products(purchase.SerialNumber).then(function(response){
                        user.removeFromCart(purchase.SerialNumber);
                    });
                });

            }

            res.json({success: true, history: user.getPurchaseHistory});
        });
    }

    /**
     * returns teh purchase history
     * @param req
     * @param res
     */
    getPurchaseHistory(req, res){
        purchases.SQLget_purchases_All(req.query.username).then(function(response){
            res.json(response);
        });
        return 'x';
    }

    returnItem(req, res){
        purchases.SQLgetSingle_purchase(req.body.username, req.body.serialNumber).then(function(purchase){
            if(purchase.failure){//something went wrong, see aspect for further info
                return res.status(500).json(purchase);// failed
            }
            else{
                let product = {SerialNumber: purchase.SerialNumber, ModelNumber: purchase.ModelNumber, Available: 1};
                purchases.SQLset_purchases_isReturned(req.body.username, product.SerialNumber, 1).then(function(response){//setting as returned
                    //checking for failures
                    if(response.Error){
                        purchase.IsReturned = 0;
                        return res.status(500).json(response);
                    }
                    else if(response.failure){
                        return res.status(500).json(response);
                    }
                    else{//proceed to restoring product to db
                        purchase.IsReturned = 1;//changing state of purchase instance
                        ClientDashboardMapper.productTDG.SQLaddSpecific_products(product).then(function(response){
                            if(response.Error){//failure
                                purchase.IsReturned = 0;
                                return res.status(500).json(purchase);
                            }
                        });
                    }
                });

                return res.json(purchase);
            }
        });
    }



};
/**
 * Created by CharlesPhilippe on 2017-11-04.
 */
const meld = require('meld'),
    jquery = require('jquery-deferred'),
    CatalogueAspect = require('./CatalogueAspect.js'),
    ClientDashboardMapper = require('../mappers/ClientDashboardMapper.js'),
    CatalogueMapper = require('../mappers/CatalogueMapper.js'),
    UsersIdentityMap = require('../IdentityMaps/UsersIdentityMap.js'),
    ProductId = require('../classes/ProductClasses/ProductId.js'),
    User = require('../classes/user.js');



module.exports = class ClientDashboardAspect extends CatalogueAspect{



    /**
     *
     * @param {ClientDashboardMapper} mapper
     */
    constructor(mapper){
        super(mapper);
        this.getUserAspect.remove();
        //leaving for super instances only
        this.getAllAspect.remove();//removes interference
        //defining aspects;

        meld.on(mapper, 'removeFromCart', this.onRemoveFromCart);

        meld.around(mapper, 'addToCart', this.aroundAddToCart);
        meld.around(mapper,'addToCart', this.aroundAuthorization);
        meld.around(mapper, 'getShoppingCart', this.aroundAuthorization);
        meld.around(mapper,'removeFromCart', this.aroundAuthorization);
        meld.around(mapper,'completeTransaction', this.aroundAuthorization);
        meld.around(mapper,'getPurchaseHistory', this.aroundAuthorization);
        meld.around(mapper, 'returnItem', this.aroundAuthorization);

        meld.around(CatalogueMapper.productTDG, 'SQLgetSingle_products', this.aroundGetId);
        meld.around(ClientDashboardMapper.purchases, 'SQLget_purchases_All', this.aroundGetPurchases);
        meld.around(ClientDashboardMapper.purchases, 'SQLgetSingle_purchase', this.aroundGetSinglePurchase);

        meld.on(ClientDashboardMapper.purchases, 'SQLadd_purchases', this.onAmountChange);
        meld.on(CatalogueMapper.productTDG,'SQLaddSpecific_products', this.onAmountChange);
        //meld.on(CatalogueMapper.productTDG,'SQLaddSpecific_products', this.onAddSpecificProduct);

    }



/*

Shopping Cart

 */

    /**
     * Makes sure that Products in the listing
     * before proceeding to addToCart
     */
    aroundAddToCart(){
        let joinpoint = meld.joinpoint();
        let req = joinpoint.args[0];
        let res = joinpoint.args[1];

        let index = ClientDashboardAspect.productListing.findModel(req.body.modelNumber);//looking for model
        if(index === -1){
            res.status(500).send('Item not found in productListing');
        }
        else{
            //setting the product ids
            let product = ClientDashboardAspect.productListing.content[index];
            //prevents multiple db calls acts as identity map for product ids
            if(!product.hasUnusedIds() && !product.hasUsedIds()){
                CatalogueMapper.productTDG.SQLget_products(product.ModelNumber).then(function(response){
                    product.setUnusedIds(response);
                    joinpoint.proceed();//eventually,maybe do tdg call in item not found, but right now we are sure that if it's no in listing, it's not in db
                });
            }
            else{
                joinpoint.proceed();//eventually,maybe do tdg call in item not found, but right now we are sure that if it's no in listing, it's not in db
            }
            //after everything check for ids made available by the user (background check)
            product.checkForReleasedIds();

        }
    }

    /**
     * After removing from cart, remove from product
     * @param req
     * @param res
     */
    onRemoveFromCart(req, res){
        let product = ClientDashboardAspect.productListing.getModel(req.body.modelNumber);
        product.restoreId(req.body.serialNumber);
        CatalogueMapper.unitOfWork.registerDirty(product);
    }


    /**
     * Gets productId from db, so set it as used in product, returns it to dashboard
     *
     * @returns {jQuery.Deferred|exports.Deferred|Deferred}
     */
    aroundGetId(){
        let joinpoint = meld.joinpoint();
        let data = new jquery.Deferred();
        let product = ClientDashboardAspect.productListing.getModel(joinpoint.args[0]);
        //making sure there are some available ids
        if(product.Amount > 0){
            //check if contents if idMap matches db
            if(!product.hasUnusedIds()){
                joinpoint.proceed().then(function(response){
                    if(response.length === 0){//no more in db
                        product.Amount = 0;
                        data.resolve(null);
                    }
                    else{//should never occur because of the around
                        console.log("The impossible happened");
                        let id = new ProductId(response[0], product.Price);
                        product.addToUsedIds(id);
                        data.resolve(id);

                    }

                });
            }
            else{
                //sends data from instantiated products in product
                data.resolve(product.popUnusedId());//give single id
            }

        }
        else{
            data.resolve(null);
        }

        return data;
    }



    /*

    Purchases



     */


    /**
     * Returns the list of purchases made by the specified user
     *
     * @returns {exports.Deferred|jQuery.Deferred|Deferred}
     */
    aroundGetPurchases(){
        let joinpoint = meld.joinpoint();
        let data = new jquery.Deferred();

        let client = CatalogueAspect.activeUsers.getUser(joinpoint.args[0]);
            //user must exist
            if(client){
                let history = client.getPurchaseHistory();
                if(history.length > 0){//history exists
                    data.resolve(history);
                }
                else{//check the database
                    joinpoint.proceed().then(function(response){
                        client.setPurchaseHistory(response);
                        data.resolve(response);
                    });
                }

            }
            else{
                data.resolve({failure: true, msg: "Client must be logged in"})
            }


        return data

    }


    /**
     * returns a single purchase, either directly from the user or from the database
     * @returns {exports.Deferred|jQuery.Deferred|Deferred}
     */
    aroundGetSinglePurchase(){
        let joinpoint = meld.joinpoint();
        let data = new jquery.Deferred();
        let username = joinpoint.args[0];
        let serialNumber = joinpoint.args[1];

        let client = CatalogueAspect.activeUsers.getUser(username);//getting instance of user

        if(client){//user has to be logged in
            let purchase = client.getPurchasedSerialNumber(serialNumber);

            //purchase is there, in the purchase history
            if(purchase){
                //setting purchase to returned
                if(purchase.IsReturned === 1){
                    return data.resolve({failure: true, msg: "Item is already returned"})
                }
                purchase.IsReturned = 1;
                data.resolve(purchase);
                console.log(purchase.IsReturned, " aspect, from id map")
            }
            else{
                joinpoint.proceed().then(function(response){
                    //check if puchase actually exists
                    if(response.length > 0){
                        //adding purchase to purchase history
                        if(response[0].IsReturned ===1){
                            return data.resolve({failure: true, msg: "Item is already returned"})
                        }
                        response[0].IsReturned = 1;//setting as returned purchase
                        client.addPurchase(response[0]);
                        data.resolve(response[0]);
                        console.log(response[0], " aspect, from db")
                    }
                    else{//item was not found
                        data.resolve({failure: true, msg: "Could not find purchased Item"});
                    }
                });
            }

        }
        else{
            data.resolve({failure: true, msg: "Must be loggged in user"});//user isn't part of the active users
        }

        return data;

    }


    /**
     * Saves new amount directly to database upon returns and purchases
     * @param item
     */
    onAmountChange(item){
        let product =  CatalogueAspect.productListing.getModel(item.ModelNumber);

        if(meld.joinpoint().method === 'SQLaddSpecific_products'){
            product.addToUnusedIds(new ProductId(item, product.Price));
            product.Amount++;
        }

        CatalogueMapper.modelTDG.SQLupdate_amount(item.ModelNumber, product.Amount);


    }

};
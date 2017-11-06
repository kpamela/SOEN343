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

let _activeUsers = new UsersIdentityMap();

module.exports = class ClientDashboardAspect extends CatalogueAspect{

    /**
     *
     * @returns {UsersIdentityMap}
     */
    static get activeUsers(){
        return _activeUsers;
    }

    /**
     *
     * @param {ClientDashboardMapper} mapper
     */
    constructor(mapper){
        super(mapper);
        this.viewAspect.remove();//leaving for super instances only
        this.getAllAspect.remove();//removes interference
        //defining aspects;
        meld.on(mapper, 'removeFromCart', this.onRemoveFromCart);

        meld.around(mapper, 'addToCart', this.aroundAddToCart);
        meld.around(mapper,'addToCart', this.aroundAuthorization);
        meld.around(mapper, 'getShoppingCart', this.aroundAuthorization);
        meld.around(mapper,'removeFromCart', this.aroundAuthorization);
        meld.around(ClientDashboardMapper.userTDG, 'SQLget_users', this.aroundGetUser);
        meld.around(ClientDashboardMapper.productTDG, 'SQLgetSingle_products', this.aroundGetId);
    }



    /**
     * Gets the user either from the identity map, or db
     * @returns {jQuery.Deferred|exports.Deferred|Deferred}
     */
    aroundGetUser(){
        let joinpoint = meld.joinpoint();
        let data = new jquery.Deferred();
        let index = ClientDashboardAspect.activeUsers.findUser(joinpoint.args[0]);
        //if not found fetch from db, and add to active user
        if(index == -1){
            joinpoint.proceed().then(function(response){
                let user = new User(response[0]);
                ClientDashboardAspect.activeUsers.add(user);
                data.resolve(user);
            });
        }
        else{//user found in active users
            data.resolve(ClientDashboardAspect.activeUsers.content[index]);
        }

        return data;
    }



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
                ClientDashboardMapper.productTDG.SQLget_products(product.ModelNumber).then(function(response){
                    product.setUnusedIds(response);
                    joinpoint.proceed();//eventually,maybe do tdg call in item not found, but right now we are sure that if it's no in listing, it's not in db
                });
            }
            else{
                joinpoint.proceed();//eventually,maybe do tdg call in item not found, but right now we are sure that if it's no in listing, it's not in db
            }

        }
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
                        let id = new ProductId(response[0]);
                        product.addToUsedIds(id);
                        data.resolve(id);
                        //ClientDashboardMapper.productTDG.SQLdeleteSingle_products(id.SerialNumber);
                    }

                });
            }
            else{
                //sends data from instantiated products in product
                data.resolve(product.popUnusedId());//give single id
            }
            //changes have been made
            CatalogueMapper.unitOfWork.registerDirty(product);
        }
        else{
            data.resolve(null);
        }

        return data;
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

};
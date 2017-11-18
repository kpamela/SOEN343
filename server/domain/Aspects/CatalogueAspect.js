/**
 * Created by CharlesPhilippe on 2017-11-04.
 */
const meld = require('meld'),
    jwt = require('jsonwebtoken'),
    ProductsIdentityMap = require('../IdentityMaps/ProductsIdentityMap'),
    Admin = require('../classes/Admin.js'),
    Client = require('../classes/Client.js'),
    jquery = require('jquery-deferred'),
    CatalogueMapper = require('../mappers/CatalogueMapper.js'),
    UsersIdentityMap = require('../IdentityMaps/UsersIdentityMap.js'),
    User = require('../classes/user.js'),
    ModelTDG = require('../../data-source/TDG/ModelTDG.js'),
    DesktopComputer =  require('../classes/ProductClasses/DesktopComputer'),
    LaptopComputer = require('../classes/ProductClasses/LaptopComputer'),
    TabletComputer = require('../classes/ProductClasses/TabletComputer'),
    Monitor = require('../classes/ProductClasses/Monitor.js');

let _activeUsers = new UsersIdentityMap();
let _productListing = new ProductsIdentityMap();

module.exports = class CatalogueAspect{

    /**
     * Static productListing
     * @returns {ProductsIdentityMap}
     */
    static get productListing(){
        return _productListing;
    }

    /**
     *
     * @returns {UsersIdentityMap}
     */
    static get activeUsers(){
        return _activeUsers;
    }

    /**
     * Needs a CatalogueMapper to listen
     *
     * @param {CatalogueMapper} mapper
     */
  constructor(mapper){
      this.aroundGetAll = this.aroundGetAll.bind(this);
      this.aroundAuthorization = this.aroundAuthorization.bind(this);
      //Defining aspects
        this.mapper = mapper;
        //this.viewAspect = meld.around(mapper, 'view', this.aroundAuthorization);

        this.getAllAspect = meld.around(CatalogueMapper.modelTDG, 'SQLget_models_All', this.aroundGetAll);
        this.getUserAspect = meld.around(CatalogueMapper.userTDG, 'SQLget_users', this.aroundGetUser);


  }

  /*
  Advice
   */

    /**
     * Authorizes user's token before executing
     *
     * @returns {*}
     */
    aroundAuthorization() {
        let joinpoint = meld.joinpoint();
        let req = joinpoint.args[0];
        let res = joinpoint.args[1];

        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({success: false, msg: "Unauthorized: No Token Provided"});
        }
        //TODO Check if admin call admin functions

        return jwt.verify(token, 'mysecret', function (err, decoded) {
            if (err) {
                return res.status(401).json({success: false, msg: "Unauthorized: Incorrect Token Signature"});
            }
            else {
                //make suere that users can access their info only
                if(req.body.username){
                    if (req.body.username !== decoded.user.Username) {
                       return res.status(401).json({success: false, msg: "Unauthorized: usernames must match"})
                    }
                }
                else if(req.query.username){
                    if (req.query.username !== decoded.user.Username) {
                       return res.status(401).json({success: false, msg: "Unauthorized: usernames must match"})
                    }
                }
                //else{

                let index = CatalogueAspect.activeUsers.findUser(decoded.user.Username);
                //adding new active user to active users list
                if(index === -1){
                    let activeUser = CatalogueAspect.addNewActiveUser(decoded.user);///activeUser
                    if(!activeUser){//occurs when an admin is already logged in
                        return res.json({success: false, msg:"An Admin is already logged in"});
                    }


                }

                joinpoint.proceed();
            }
        });
    }





    /**
     * Gets the user either from the identity map, or db
     * @returns {jQuery.Deferred|exports.Deferred|Deferred}
     */
    aroundGetUser(){
        let joinpoint = meld.joinpoint();
        let data = new jquery.Deferred();

        let index = CatalogueAspect.activeUsers.findUser(joinpoint.args[0]);
        //if not found fetch from db, and add to active user
        if(index === -1){
            joinpoint.proceed().then(function(response){
                let user = CatalogueAspect.addNewActiveUser(response[0]);// watch this one out, make sure that no admin call this...
                console.log(user);
                data.resolve(user);
            });
        }
        else{//user found in active users
            data.resolve(CatalogueAspect.activeUsers.content[index]);
        }

        return data;
    }



    /**
     * Gets data from database if listing is empty
     * else it returns productListing, since it should be kept up to date
     *
     * @returns {jQuery.Deferred|exports.Deferred|Deferred}
     */
  aroundGetAll(){
        console.log(CatalogueAspect.productListing.content,"%%%%%%%%%%%%%%%%%%%%");
      let data = new jquery.Deferred();//matching TDG calls
      if(CatalogueAspect.productListing.content.length == 0){//empty listing, fetch from db
          meld.joinpoint().proceed().then(function(response){
              CatalogueAspect.setListingFromDatabase(response);

              data.resolve(CatalogueAspect.productListing);
          });//proceeding to tdg call
      }
      else{//otherwise listing should be up to date
          data.resolve(CatalogueAspect.productListing)
      }
      return data;
  }





  /*
  Helper functions
   */

    /**
     * Should be used as the callback function of SQLget_models_All
     * Sets the content of the productListing to the content of the database, passed in as argument
     * @param data
     */
    static setListingFromDatabase(data){
        CatalogueAspect.productListing.content = [];
        for(let i in data){
            let product = CatalogueAspect.addNewProduct(data[i].Category,data[i]);
            if(product){//ignore undefined
                if(product.IsDeleted === 1){//previously deleted
                    CatalogueAspect.productListing.addDeletedProduct(product.ModelNumber);
                }
                else{
                    CatalogueAspect.productListing.add(product);
                }
                //console.log(product);
            }
        }


    }

    /**
     * Instantiate and return a product created from a category, and an already existing product
     * @param category
     * @param product
     * @returns {ProductDescription}
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


    /**
     *
     * @param user
     * @returns {User}
     */
    static addNewActiveUser(user){

        if(user.Administrator === 1){
            user = new Admin(user);
            CatalogueAspect.activeUsers.add(user);
            return user;
        }
        else{
            user = new Client(user);
            CatalogueAspect.activeUsers.add(user);
            return user;
        }
    }

};
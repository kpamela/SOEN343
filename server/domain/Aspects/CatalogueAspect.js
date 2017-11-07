/**
 * Created by CharlesPhilippe on 2017-11-04.
 */
const meld = require('meld'),
    jwt = require('jsonwebtoken'),
    ProductsIdentityMap = require('../IdentityMaps/ProductsIdentityMap'),
    jquery = require('jquery-deferred'),
    CatalogueMapper = require('../mappers/CatalogueMapper.js');
    ModelTDG = require('../../data-source/TDG/ModelTDG.js'),
    DesktopComputer =  require('../classes/ProductClasses/DesktopComputer'),
    LaptopComputer = require('../classes/ProductClasses/LaptopComputer'),
    TabletComputer = require('../classes/ProductClasses/TabletComputer'),
    Monitor = require('../classes/ProductClasses/Monitor.js');

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
     * Needs a CatalogueMapper to listen
     *
     * @param {CatalogueMapper} mapper
     */
  constructor(mapper){
      this.aroundGetAll = this.aroundGetAll.bind(this);
      //Defining aspects

        this.viewAspect = meld.around(mapper, 'view', this.aroundAuthorization);

        this.getAllAspect = meld.around(CatalogueMapper.modelTDG, 'SQLget_models_All', this.aroundGetAll);

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


        return jwt.verify(token, 'mysecret', function (err, decoded) {
            if (err) {
                return res.status(401).json({success: false, msg: "Unauthorized: Incorrect Token Signature"});
            }
            else {
                //make suere that users can access their info only
                if(req.body.username){
                    if(req.body.username === decoded.user.Username){
                        joinpoint.proceed();//matching
                    }
                    else{
                        res.status(401).json({success: false, msg: "Unauthorized: usernames must match"})
                    }
                }
                else if(req.query.username){
                    if(req.query.username === decoded.user.Username){
                        joinpoint.proceed();//matching
                    }
                    else{
                        res.status(401).json({success: false, msg: "Unauthorized: usernames must match"})
                    }
                }
                else{
                    joinpoint.proceed();
                }
            }
        });
    }


    /**
     * Gets data from database if listing is empty
     * else it returns productListing, since it should be kept up to date
     *
     * @returns {jQuery.Deferred|exports.Deferred|Deferred}
     */
  aroundGetAll(){

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
                CatalogueAspect.productListing.add(product);
                console.log(product);
            }
        }
        console.log("%%%%%%%%%%%%%%%%%%%%");

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

};
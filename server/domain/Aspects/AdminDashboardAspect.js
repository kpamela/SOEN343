/**
 * Created by CharlesPhilippe on 2017-11-04.
 */
const meld = require('meld'),
    CatalogueAspect = require('./CatalogueAspect.js'),
    CatalogueMapper = require('../mappers/CatalogueMapper.js'),
    AdminDashboardMapper = require('../mappers/AdminDashboardMapper.js'),
    ProductHistory = require('../IdentityMaps/ProductHistory.js'),
    jquery = require('jquery-deferred');

let _productHistory = new ProductHistory();

module.exports = class AdminDashboardAspect extends CatalogueAspect{

    /**
     * common history
     * @returns {ProductHistory}
     */
    static get productHistory(){
        return _productHistory;
    }

    /**
     *
     * @param {AdminDashboardMapper} mapper
     */
  constructor(mapper){
      super(mapper);
        //leaving for super instances only
        this.getUserAspect.remove();
        this.getAllAspect.remove();//removes interference

      //defining aspects;
        meld.before(mapper, 'remove', this.beforeRemove);

        meld.around(CatalogueAspect, 'addNewActiveUser', this.singleAdminCheck);
        meld.around(mapper,'revertChanges', this.aroundAuthorization);
        meld.around(mapper,'getCommitState', this.aroundAuthorization);
        meld.around(mapper, 'add',  this.aroundAdd);//should occur after the one under
        meld.around(mapper,'add', this.aroundAuthorization);
        meld.around(mapper,'commitChanges', this.aroundAuthorization);
        meld.around(mapper,'remove', this.aroundAuthorization);
        meld.around(mapper, 'modify', this.aroundModify);
        meld.around(mapper,'modify', this.aroundAuthorization);
        meld.around(mapper, 'getRegisteredUsers', this.aroundAuthorization);
        meld.around(CatalogueMapper.modelTDG, 'SQLadd_models', this.aroundSQLadd);
        meld.around(CatalogueMapper.unitOfWork, 'commit', this.aroundUoWCommit);
        meld.around(CatalogueMapper.unitOfWork, 'rollback', this.aroundUoWRollback);
        //called after rollback, to send the new data to frontend
      //  meld.around(CatalogueMapper.modelTDG, 'SQLget_models_All', super.aroundGetAll);

        meld.on(CatalogueMapper.modelTDG, 'SQLdelete_models', this.onSQLDelete);
        meld.on(CatalogueMapper.unitOfWork,'registerNew',this.onRegisterNew);
        meld.on(CatalogueMapper.unitOfWork, 'registerDirty',this.onRegisterDirty);
        meld.on(CatalogueMapper.unitOfWork, 'registerDeleted', this.onRegisterDeleted);


  }

  /*
  advice
   */





  /*
  For Adding items
   */

    /**
     * Checks if model already exists before adding it to listing
     */
  aroundAdd(){
      let joinpoint = meld.joinpoint();
      let req = joinpoint.args[0];
      let res = joinpoint.args[1];
      if(AdminDashboardAspect.productListing.findModel(req.body.data.modelNumber) > -1){//item already exists
          return res.status(409).send('Item already exists');

      }
      else{//proceed to adding to listing normally
          joinpoint.proceed();
      }
  }


    /**
     * Checks if an item was previously deleted
     * If so update Fields
     * If not, add new product
     *
     * @returns {jQuery.Deferred|exports.Deferred|Deferred}
     */
    aroundSQLadd(){
        let data = new jquery.Deferred();
        let joinpoint = meld.joinpoint();
        let model = joinpoint.args[0];
        //Checking if the item was previously deleted
        if(!AdminDashboardAspect.productListing.deletedItems[model.ModelNumber]){
            //if not then proceed
            data = joinpoint.proceed();
        }
        else{// else, set wasDeleted as true, which will update instead of adding
            data = joinpoint.proceed(model, true);
            AdminDashboardAspect.productListing.restoreDeletedProduct(model.ModelNumber);
        }

        return data;
    }



    /**
     * After adding product to unit of work, add it to listing
     * it gets the product from the argument passed to register new
     *
     * @param {ProductDescription} product
     */
  onRegisterNew(product){
      AdminDashboardAspect.productListing.add(product);
  }






  /*

  For modifying items


   */

    /**
     * Handles removing old product from product listing, pushing to product history (current, and old)
     */
  aroundModify(){

      let joinpoint = meld.joinpoint();
      let req = joinpoint.args[0];
      let res = joinpoint.args[1];
      const old = AdminDashboardAspect.productListing.popModel(req.body.previous);//making sure it is no longer in listing
      if(old.flag === 1){//check if already modified
          const ind = AdminDashboardAspect.productHistory.getCurrentModelIndexInHistory(old.ModelNumber);
          AdminDashboardAspect.productHistory.modified[ind].current = req.body.current.description.modelNumber;//swapping current to new current
          CatalogueMapper.unitOfWork.removeFromChangeList(old);//removing old object from change list
      }
      else{
          AdminDashboardAspect.productHistory.modified.push(
              {current: req.body.current.description.modelNumber,
                  old: old}
          );
      }
      joinpoint.proceed();
  }

    /**
     * Adds newly modified product to listing
     * Checks if it's there, if so update
     * else add
     *
     * @param {ProductDescription} product
     */
  onRegisterDirty(product) {
        let index = AdminDashboardAspect.productListing.findModel(product.ModelNumber);
        if (index === -1) {
            AdminDashboardAspect.productListing.add(product);
        }
        else {
            AdminDashboardAspect.productListing.setTo(index, product);

        }
    }


    /*

    For deleting Items


     */

    /**
     * Modifies the structure of req, to include an instanciated product
     * and removes the model from productListing
     *
     * @param req
     * @param res
     */
  beforeRemove(req, res){
      req.body['product'] = AdminDashboardAspect.productListing.popModel(req.body.model);
  }

    /**
     * Adds model number to deleted products list
     * prevents primary key conflict upon adding a product that was previoulsy deleted
     *
     * @param modelNumber
     */
    onSQLDelete(modelNumber){
        AdminDashboardAspect.productListing.addDeletedProduct(modelNumber);
    }


    /**
     * saves deleted product to product history
     *
     * @param product
     */
  onRegisterDeleted(product){
      AdminDashboardAspect.productHistory.deleted.push(product);
  }

/*

Unit of Work specific

 */


    /**
     * Gets the changes list from the UoW from commit
     * Modifies it to contain instances of products instead
     * @returns {{newList: Array, dirtyList: Array, deletedList: Array}}
     */
  aroundUoWCommit(){
      let joinpoint = meld.joinpoint();
      let changes = joinpoint.proceed();//getting the change list from UoW
      let productChanges = {newList:[], dirtyList:[], deletedList:[]};//list containing the products themselves
        const NEW = 2;
        const DIRTY = 1;


        for(let i = 0; i<AdminDashboardAspect.productListing.content.length; i++){
            let product = AdminDashboardAspect.productListing.content[i];
            let flag = product.getFlag();

            switch(flag){
                case NEW:
                        //getting the instance of model number stored in changeList, pass it to productChanges
                        productChanges.newList.push(product);
                        break;
                case DIRTY:
                        let oldModel = AdminDashboardAspect.productHistory.getOldModel(product.ModelNumber);
                        //getting the instance of model number stored in changeList, pass it to productChanges
                        productChanges.dirtyList.push({newModel: product, oldModel: oldModel});
                        break;
                //DELETED corresponds to history
            }
        }

        //getting the instances of model stored in history, pass it to product changes
        productChanges.deletedList = AdminDashboardAspect.productHistory.deleted;

      //resetting history
      AdminDashboardAspect.productHistory.resetHistory();

      return productChanges;
  }




    /**
     * Gets the changes list from UoW from rollback
     * Modifies it to return the instances of products
     * @returns {{newList: Array, dirtyList: Array, deletedList: Array}}
     */
  aroundUoWRollback(){
      let joinpoint = meld.joinpoint();
      let changes = joinpoint.proceed();
      let productChanges = {newList:[], dirtyList:[], deletedList:[]};//list containing the products themselves

      for(let i in changes.newList){
          //retrieves and removes new product, they are going to be forgotten eventually
          productChanges.newList[i] = AdminDashboardAspect.productListing.popModel(changes.newList[i]);
      }
      for(let i in changes.dirtyList){
          //getting the current index
          const index = AdminDashboardAspect.productListing.findModel(changes.dirtyList[i]);
          //getting old object
          let old = AdminDashboardAspect.productHistory.getOldModel(changes.dirtyList[i]);
          //restoring old model
          AdminDashboardAspect.productListing.content[index] = old;
            //the modified object will be forgotten
          productChanges.dirtyList[i] = old;
      }
      for(let i in changes.deletedList){
          let old = AdminDashboardAspect.productHistory.getDeletedModel(changes.deletedList[i]);
          //readding the old product
          AdminDashboardAspect.productListing.add(old);

          productChanges.deletedList[i] = old;
      }

      AdminDashboardAspect.productHistory.resetHistory();
      return productChanges;
  }


    /**
     * Checks if an admin is already logged in
     * if not, logs current admin
     * @returns {*}
     */
  
    singleAdminCheck(){
        let joinpoint = meld.joinpoint();
        let usr = joinpoint.args[0];

        if(usr.Administrator === 1){
            if(!AdminDashboardMapper.admin){//if there are no admin logged in
                usr = joinpoint.proceed();
                AdminDashboardMapper.admin = usr;//setting logged in administrator
                return usr;
            }
            else{//admin is logged in
                return null
            }
        }
        else{//not an admin
            return joinpoint.proceed();
        }

  }

};


/**
 * Created by CharlesPhilippe on 2017-11-04.
 */
const meld = require('meld'),
    CatalogueAspect = require('./CatalogueAspect.js'),
    CatalogueMapper = require('../mappers/CatalogueMapper.js'),
    AdminDashboardMapper = require('../mappers/AdminDashboardMapper.js'),
    ProductHistory = require('../IdentityMaps/ProductHistory.js');

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
        this.getUserAspect.remove();
        this.viewAspect.remove();//leaving for super instances only
        this.getAllAspect.remove();//removes interference
      //defining aspects;
        meld.before(mapper, 'remove', this.beforeRemove);

        meld.around(mapper,'revertChanges', this.aroundAuthorization);
        meld.around(mapper,'getCommitState', this.aroundAuthorization);
        meld.around(mapper, 'add',  this.aroundAdd);//should occur after the one under
        meld.around(mapper,'add', this.aroundAuthorization);
        meld.around(mapper,'commitChanges', this.aroundAuthorization);
        meld.around(mapper,'remove', this.aroundAuthorization);
        meld.around(mapper, 'modify', this.aroundModify);
        meld.around(mapper,'modify', this.aroundAuthorization);
        meld.around(CatalogueMapper.unitOfWork, 'commit', this.aroundUoWCommit);
        meld.around(CatalogueMapper.unitOfWork, 'rollback', this.aroundUoWRollback);
        //called after rollback, to send the new data to frontend
        meld.around(AdminDashboardMapper.modelTDG, 'SQLget_models_All', this.aroundGetAll);

        meld.on(CatalogueMapper.unitOfWork,'registerNew',this.onRegisterNew);
        meld.on(CatalogueMapper.unitOfWork, 'registerDirty',this.onRegisterDirty);
        meld.on(CatalogueMapper.unitOfWork, 'registerDeleted', this.onRegisterDeleted);
  }

  /*
  advice
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
     * Before adding product to unit of work, add it to listing
     * it gets the product from the argument passed to register new
     * @param {ProductDescription} product
     */
  onRegisterNew(product){
      AdminDashboardAspect.productListing.add(product);
  }

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
     * Adds to product listing
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
     * saves deleted product
     * @param product
     */
  onRegisterDeleted(product){
      AdminDashboardAspect.productHistory.deleted.push(product);
  }

    /**
     * Gets the changes list from the UoW from commit
     * Modifies it to contain instances of products instead
     * @returns {{newList: Array, dirtyList: Array, deletedList: Array}}
     */
  aroundUoWCommit(){
      let joinpoint = meld.joinpoint();
      let changes = joinpoint.proceed();//getting the change list from UoW
      let productChanges = {newList:[], dirtyList:[], deletedList:[]};//list containing the products themselves
      //new items
      for(let i in changes.newList){
          //getting the instance of model number stored in changeList, pass it to productChanges
          productChanges.newList[i] = AdminDashboardAspect.productListing.getModel(changes.newList[i]);
      }
      for(let i in changes.dirtyList){
          let oldModel = AdminDashboardAspect.productHistory.getOldModel(changes.dirtyList[i]);
          //getting the instance of model number stored in changeList, pass it to productChanges
          productChanges.dirtyList[i] = {newModel: AdminDashboardAspect.productListing.getModel(changes.dirtyList[i]),
                                            oldModel: oldModel};
      }
      for(let i in changes.deletedList){
          //getting the instance of model stored in history, pass it to product changes
          productChanges.deletedList[i] = AdminDashboardAspect.productHistory.getDeletedModel(changes.deletedList[i]);
      }
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

          AdminDashboardAspect.productListing.add(old);

          productChanges.deletedList[i] = old;
      }

      AdminDashboardAspect.productHistory.resetHistory();
      return productChanges;
  }


};


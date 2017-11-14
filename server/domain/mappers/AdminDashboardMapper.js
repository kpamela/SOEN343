/**
 * Created by CharlesPhilippe on 2017-10-22.
 */
const Catalogue = require('./CatalogueMapper.js'),
    ModelTDG = require('../../data-source/TDG/ModelTDG.js'),
    ProductTDG = require('../../data-source/TDG/ProductTDG.js'),
    DesktopComputer =  require('../classes/ProductClasses/DesktopComputer.js'),
    LaptopComputer = require('../classes/ProductClasses/LaptopComputer.js'),
    TabletComputer = require('../classes/ProductClasses/TabletComputer.js'),
    Monitor = require('../classes/ProductClasses/Monitor.js');
const ProductHistory = require('../IdentityMaps/ProductHistory.js');
const aspect = require('aspect-js');
const meld = require('meld');

/**
 * A single admin is allowed on the system at any one time.
 * @type {Admin}
 */
let _admin = null;

module.exports = class AdminDashboardMapper extends Catalogue{

    /**
     *
     * @returns {Admin}
     */
    static get admin(){
        return _admin;
    }

    /**
     *
     * @param {Admin} usr
     */
    static set admin(usr){
        _admin = usr
    }

   constructor() {
        super();

        this.add = this.add.bind(this);
        this.view = super.view.bind(this);

    }

    /**
     * Instantiates a new product, registers it as new...
     * @param req
     * @param res
     */
    add(req, res){

            let category = req.body.data.category;
            if (!category.match(/^(DesktopComputer|TabletComputer|LaptopComputer|television|Monitor)$/)){
                return res.json(400, {success: false, msg: "Invalid product Category."});
            }

            //Instantiates a new product with the information passed in via the HTTP request
            let product = AdminDashboardMapper.addNewProduct(category, req.body.data);


            //transfer to unit of work for later commit
            AdminDashboardMapper.unitOfWork.registerNew(product);

            //Returns teh new productListing contents, and the state of commit
            return res.json({msg:"Item has been added to change list",
                newData: product,
                hasUncommittedChanges: AdminDashboardMapper.unitOfWork.hasUncommittedChanges});

    }



    /**
     * Modifies an existing product, and set it to dirty in Unit of work
     *
     * The old product is stored in the productHistory, along with the current model number of the modified object
     * This allows to modify the model number without losing any information regarding the previous modelNumber
     *
     * First has to check if the model was already change to prevent duplicates when reverting.
     * So if an item is changed multiple times, only the previous item is stored, this might be a problem
     * If an item was already changed, it needs to be removed from the change list of UoW
     *
     * @param req
     * @param res
     */
    modify(req, res){

            let newProduct = AdminDashboardMapper.addNewProduct(req.body.current.category, req.body.current);

            AdminDashboardMapper.unitOfWork.registerDirty(newProduct);

            res.json({msg:"Item set to modify. Commit when ready",
                hasUncommittedChanges: AdminDashboardMapper.unitOfWork.hasUncommittedChanges});

    }


    /**
     * Removes an item from the productListing, and stores it temporarily to the productHistory
     * @param req
     * @param res
     */
    remove(req, res){

            AdminDashboardMapper.unitOfWork.registerDeleted(req.body.product);

            res.json({msg: "Item will be deleted on commit.",
                hasUncommittedChanges: AdminDashboardMapper.unitOfWork.hasUncommittedChanges})


    }


    /**
     * Commits all changes since previous commit to the database.
     * This is the only place the Database is accessed via the TDGs
     * @param req
     * @param res
     */
    commitChanges(req, res){

            let changes = AdminDashboardMapper.unitOfWork.commit();

            //Committing changes from unit of work
            //storing them on db
            //setting all clean -> sets UoW's changeList to default
        
           for(let i in changes.newList){
                let product = changes.newList[i];

                AdminDashboardMapper.unitOfWork.registerClean(product);


               AdminDashboardMapper.modelTDG.SQLadd_models(product).then(function(response){
                    console.log(response);
                   AdminDashboardMapper.productTDG.SQLadd_products(product.ModelNumber, product.Amount).then(function(response){
                        console.log(response);
                        console.log("Added product: " + product.ModelNumber);
                    });
                });
            }
            for(let i in changes.dirtyList){
                let product = changes.dirtyList[i].newModel;
                let old = changes.dirtyList[i].oldModel;
                AdminDashboardMapper.unitOfWork.registerClean(product);
                if(old.ModelNumber === product.ModelNumber){//same model number
                    AdminDashboardMapper.modelTDG.SQLmodify_models(old.ModelNumber, product).then(function(response){
                        console.log(response);
                        console.log("Modified product: "+product.ModelNumber);
                    });
                    if(old.Amount < product.Amount){//add specified quantity
                        AdminDashboardMapper.productTDG.SQLadd_products(old.ModelNumber, product.Amount - old.Amount);
                    }
                    else if(old.Amount < product.Amount){//remove specified quantity
                        AdminDashboardMapper.productTDG.SQLadd_products(old.ModelNumber, old.Amount - product.Amount);
                    }
                }
                else{
                    AdminDashboardMapper.productTDG.SQLdelete_products(old.ModelNumber).then(function(response){
                        AdminDashboardMapper.modelTDG.SQLmodify_models(old.ModelNumber, product).then(function(response){
                            console.log("Modified product: "+product.ModelNumber);
                            AdminDashboardMapper.productTDG.SQLadd_products(product.ModelNumber, product.Amount);
                        })
                    })
                }

                //TODO tdg work
            }
            for(let i in changes.deletedList){
                let product = changes.deletedList[i];

                AdminDashboardMapper.unitOfWork.registerClean(product);

                //TODO tdg work for product ids
                AdminDashboardMapper.productTDG.SQLdelete_products(product.ModelNumber).then(function(response){
                    AdminDashboardMapper.modelTDG.SQLdelete_models(product.ModelNumber).then(function(response){
                        console.log("Deleted product: " + product.ModelNumber);
                    });
                });

            }

            if(AdminDashboardMapper.unitOfWork.hasUncommittedChanges){

                return res.status(500).json("Oops, something went wrong ")
            }


            res.json({msg: "All changes have been committed to Database.",
                hasUncommittedChanges: AdminDashboardMapper.unitOfWork.hasUncommittedChanges})



    }


    /**
     * Reverts all changes since the last commit.
     * Resets unit of work
     *
     * new items are simply removed from product listing
     *
     * dirty items are restored to their previous state
     *
     * removed items are replaced in the productListing
     * @param req
     * @param res
     */
    revertChanges(req, res){

         if(!AdminDashboardMapper.unitOfWork.hasUncommittedChanges){
            return res.status(412).json("No changes to revert");
        }
        else{
            let changes = AdminDashboardMapper.unitOfWork.rollback();
            //reverting all changes to as they are in the database
            //setting all clean -> sets UoW's changeList to default

             //nothing to do with new products, simply forget them

            for(let i in changes.dirtyList){
                let old = changes.dirtyList[i];
                //setting old model to clean
                AdminDashboardMapper.unitOfWork.registerClean(old);
            }
            for(let i in changes.deletedList){

                let old = changes.deletedList[i];

                AdminDashboardMapper.unitOfWork.registerClean(old);
            }

            if(AdminDashboardMapper.unitOfWork.hasUncommittedChanges){
                return res.status(500).json("Oops, something went wrong");
            }

            //getting the current productListing
            AdminDashboardMapper.modelTDG.SQLget_models_All().then(function(response){
                return res.json({msg:"All uncommitted changes have been reverted!",
                    data: response.content,
                    hasUncommittedChanges: AdminDashboardMapper.unitOfWork.hasUncommittedChanges});
            });



        }
    }


    /**
     * Returns state of commits
     * not sure that this is useful
     * @param req
     * @param res
     */
    getCommitState(req, res){
        res.json({hasUncommittedChanges: AdminDashboardMapper.unitOfWork.hasUncommittedChanges});

    }


    /**
     * Instantiate and return a product created from a category, and an already existing product
     * @param category
     * @param product
     * @returns {*}
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


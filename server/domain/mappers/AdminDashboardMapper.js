/**
 * Created by CharlesPhilippe on 2017-10-22.
 */
const Catalogue = require('./CatalogueMapper.js'),
    DesktopComputer =  require('../classes/ProductClasses/DesktopComputer.js'),
    LaptopComputer = require('../classes/ProductClasses/LaptopComputer.js'),
    TabletComputer = require('../classes/ProductClasses/TabletComputer.js'),
    Monitor = require('../classes/ProductClasses/Monitor.js');
const ProductHistory = require('../IdentityMaps/ProductHistory.js');

/**
 * History containing the old products that were modified or deleted
 * Modified should contain the current model number, considering model numbers can change,
 * as well as the old object
 * @type {{modified: Array, deleted: Array}}
 * @private
 */
let _productHistory = new ProductHistory();


module.exports = class AdminDashboardMapper extends Catalogue{

    static get productHistory(){
        return _productHistory;
    }


    get middlewares(){
        return super.middlewares;
    }

    get routes(){
        return super.routes.concat([
                ['post', '/add','add'],
                ['patch', '/modify', 'modify'],
                ['post', '/remove', 'remove'],
                ['post', '/commitChanges', 'commitChanges'],
                ['get', '/revertChanges', 'revertChanges'],
                ['get', '/getCommitState', 'getCommitState']]);


    }

   constructor(options={}) {
        super(options);

        this.add = this.add.bind(this);

    }

    add(req, res){
        const authorization = AdminDashboardMapper.authorizeToken(req.headers.authorization);

        if(!authorization.success){
            return res.status(401).json(authorization);
        }
        else{

            let category = req.body.data.category;
            if (!category.match(/^(DesktopComputer|TabletComputer|LaptopComputer|television|Monitor)$/)){
                return res.json(400, {success: false, msg: "Invalid product category."});
            }
            //TODO fix domain objects

            let product = AdminDashboardMapper.addNewProduct(category, req.body.data);


            //transfer to unit of work for later commit
            AdminDashboardMapper.unitOfWork.registerNew(product);

            AdminDashboardMapper.productListing.add(product);

            return res.json({msg:"Item has been added to change list",
                data: AdminDashboardMapper.productListing.content,
                hasUncommittedChanges: AdminDashboardMapper.unitOfWork.hasUncommittedChanges});

        }

    }

    modify(req, res){
        const authorization = AdminDashboardMapper.authorizeToken(req.headers.authorization);

        if(!authorization.success){
            return res.status(401).json(authorization);
        }
        else{

            const index =  AdminDashboardMapper.productListing.findModel(req.body.previous);

            const old = AdminDashboardMapper.productListing.content[index];

            let newProduct = AdminDashboardMapper.addNewProduct(req.body.current.category, req.body.current);


            //storing old object until commit
            if(old.flag === 1){//item already modified
                const history = AdminDashboardMapper.getCurrentModelIndexInHistory(old.modelNumber);
                //modify current model number to handle modelnumber changes
                //keeping the old model in history
                AdminDashboardMapper.productHistory.modified[history].current = newProduct.modelNumber;
                //remove old product from changelist
                AdminDashboardMapper.unitOfWork.removeFromChangeList(old);

            }
            else{
                AdminDashboardMapper.productHistory.modified.push(
                    {current: newProduct.modelNumber,
                    old: old});
            }

            AdminDashboardMapper.unitOfWork.registerDirty(newProduct);

            AdminDashboardMapper.productListing.setTo(index, newProduct);


            //TODO figure out when to commit

            res.json({msg:"Item set to modify. Commit when ready",
                hasUncommittedChanges: AdminDashboardMapper.unitOfWork.hasUncommittedChanges});
        }
    }

    remove(req, res){
        const authorization = AdminDashboardMapper.authorizeToken(req.headers.authorization);

        if(!authorization.success){
            return res.status(401).json(authorization);
        }
        else{

            let product = AdminDashboardMapper.productListing.getModel(req.body.model);


            AdminDashboardMapper.productListing.removeModel(req.body.model);

            AdminDashboardMapper.unitOfWork.registerDeleted(product);

            //storing deleted product until commit
            AdminDashboardMapper.productHistory.deleted.push(product);

            res.json({msg: "Item will be deleted on commit.",
                hasUncommittedChanges: AdminDashboardMapper.unitOfWork.hasUncommittedChanges})

        }
    }

    commitChanges(req, res){
        const authorization = AdminDashboardMapper.authorizeToken(req.headers.authorization);

        if(!authorization.success){
            return res.status(401).json(authorization);
        }
        else{
            const changes = AdminDashboardMapper.unitOfWork.commit();

            //Committing changes from unit of work
            //storing them on db
            //setting all clean -> sets UoW's changeList to default
            while(changes.newList.length){//removing item every time
                let product = AdminDashboardMapper.productListing.getModel(changes.newList[0]);

                AdminDashboardMapper.unitOfWork.registerClean(product);
                console.log("Added product: " + product.modelNumber);
                //TODO tdg work

            }
            while(changes.dirtyList.length){//removing item every time
                let product = AdminDashboardMapper.productListing.getModel(changes.dirtyList[0]);

                AdminDashboardMapper.unitOfWork.registerClean(product);
                console.log("Modified product: "+product.modelNumber);
                //TODO tdg work
            }
            while(changes.deletedList.length){//removing item every time
                let product = AdminDashboardMapper.productHistory.getDeletedModel(changes.deletedList[0]);

                AdminDashboardMapper.unitOfWork.registerClean(product);
                console.log("Deleted product: " + product.modelNumber);
                //TODO tdg work
            }

            if(AdminDashboardMapper.unitOfWork.hasUncommittedChanges){
                console.log(AdminDashboardMapper.productHistory);
                return res.status(500).json("Oops, something went wrong ")
            }


            AdminDashboardMapper.productHistory.resetHistory();

            console.log(AdminDashboardMapper.productHistory);

            res.json({msg: "All changes have been committed to Database.",
                hasUncommittedChanges: AdminDashboardMapper.unitOfWork.hasUncommittedChanges})
        }


    }


    revertChanges(req, res){
        const authorization = AdminDashboardMapper.authorizeToken(req.headers.authorization);

        if(!authorization.success){
            return res.status(401).json(authorization);
        }
        else if(!AdminDashboardMapper.unitOfWork.hasUncommittedChanges){
            return res.status(412).json("No changes to revert");
        }
        else{
            const changes = AdminDashboardMapper.unitOfWork.rollback();
            //reverting all changes to as they are in the database
            //setting all clean -> sets UoW's changeList to default
            for(let i in changes.newList){
                //removing all new models
                AdminDashboardMapper.productListing.removeModel(changes.newList[i]);

            }
            for(let i in changes.dirtyList){
                const index = AdminDashboardMapper.productListing.findModel(changes.dirtyList[i]);
                //getting old object
                let old = AdminDashboardMapper.productHistory.getOldModel(changes.dirtyList[i]);
                //restoring old model
                AdminDashboardMapper.productListing.content[index] = old;
                //setting old model to clean
                AdminDashboardMapper.unitOfWork.registerClean(old);
            }
            for(let i in changes.deletedList){

                let old = AdminDashboardMapper.productHistory.getDeletedModel(changes.deletedList[i]);

                AdminDashboardMapper.productListing.add(old);

                AdminDashboardMapper.unitOfWork.registerClean(old);
            }

            if(AdminDashboardMapper.unitOfWork.hasUncommittedChanges){
                return res.status(500).json("Oops, something went wrong");
            }

            AdminDashboardMapper.productHistory.resetHistory();

            res.json({msg:"All uncommitted changes have been reverted!",
                data: AdminDashboardMapper.productListing.content,
                hasUncommittedChanges: AdminDashboardMapper.unitOfWork.hasUncommittedChanges})


        }
    }

    getCommitState(req, res){
        const authorization = AdminDashboardMapper.authorizeToken(req.headers.authorization);

        if(!authorization.success){
            return res.status(401).json(authorization);
        }
        else{
            res.json({hasUncommittedChanges: AdminDashboardMapper.unitOfWork.hasUncommittedChanges});
        }
    }




}


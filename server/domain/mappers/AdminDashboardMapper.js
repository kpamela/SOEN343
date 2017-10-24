/**
 * Created by CharlesPhilippe on 2017-10-22.
 */
const Catalogue = require('./CatalogueMapper.js'),
    DesktopComputer =  require('../classes/ProductClasses/DesktopComputer.js'),
    LaptopComputer = require('../classes/ProductClasses/LaptopComputer.js'),
    TabletComputer = require('../classes/ProductClasses/TabletComputer.js'),
    Monitor = require('../classes/ProductClasses/Monitor.js');


module.exports = class AdminDashboardMapper extends Catalogue{

    get middlewares(){
        return super.middlewares;
    }

    get routes(){
        return super.routes.concat([
                ['post', '/add','add'],
                ['patch', '/modify', 'modify'],
                ['post', '/remove', 'remove'],
                ['post', '/commitChanges', 'commitChanges']]);


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

            AdminDashboardMapper.productListing.add(product);

            //transfer to unit of work for later commit
            AdminDashboardMapper.unitOfWork.registerNew(product);

            return res.json(AdminDashboardMapper.productListing.content);

        }

    }

    modify(req, res){
        const authorization = AdminDashboardMapper.authorizeToken(req.headers.authorization);

        if(!authorization.success){
            return res.status(401).json(authorization);
        }
        else{

            const index =  AdminDashboardMapper.productListing.findModel(req.body.previous);

            let newProduct = AdminDashboardMapper.addNewProduct(req.body.current.category, req.body.current);

            AdminDashboardMapper.unitOfWork.registerDirty(newProduct);

            AdminDashboardMapper.productListing.setTo(index, newProduct);
            //TODO figure out when to commit

            res.send("Item set to modify. Commit when ready");
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

            res.send("Item will be deleted on commit.")

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
            for(let i in changes.newList){
                const product = AdminDashboardMapper.productListing.getModel(changes.newList[i]);

                AdminDashboardMapper.unitOfWork.registerClean(product);
                console.log(product);
                //TODO tdg work
            }
            for(let i in changes.dirtyList){
                const product = AdminDashboardMapper.productListing.getModel(changes.newList[i]);

                AdminDashboardMapper.unitOfWork.registerClean(product);
                console.log(product);
                //TODO tdg work
            }
            for(let i in changes.deletedList){
                const product = AdminDashboardMapper.productListing.getModel(changes.newList[i]);

                AdminDashboardMapper.unitOfWork.registerClean(product);
                console.log(product);
                //TODO tdg work
            }

            res.json("All changes have been committed to Database.")
        }


    }



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

}


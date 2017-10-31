/**
 * Created by CharlesPhilippe on 2017-10-23.
 */
const Catalogue = require('./CatalogueMapper.js'),
    UserMapper = require('./UserMapper.js'),
    DesktopComputer =  require('../classes/ProductClasses/DesktopComputer'),
    LaptopComputer = require('../classes/ProductClasses/LaptopComputer'),
    TabletComputer = require('../classes/ProductClasses/TabletComputer'),
    Monitor = require('../classes/ProductClasses/television');



module.exports = class ClientDashboardMapper extends Catalogue{

    //TODO
    get middlewares(){
        return super.middlewares;
    }

    //TODO
    get routes(){
        return super.routes.concat([
            ['post','/addToCart','addToCart'],
            ['post','/removeFromCart','removeFromCart']])

    }

    constructor(options={}) {
        super(options);

    }

    addToCart(req, res){
        const authorization = ClientDashboardMapper.authorizeToken(req.headers.authorization);

        if(!authorization.success){
            return res.status(401).json(authorization);
        }
        else{
            let user = UserMapper.activeUsersRegistry.getUser(req.body.username);


            if(ClientDashboardMapper.productListing.findModel(req.body.modelNumber) == -1){
                return res.status(500).send("product not found");
            }
            else{
                let product = ClientDashboardMapper.productListing.getModel(req.body.modelNumber);
                //TODO figure this out
                let id = product.getProductId();
                user.addToCart(id);

                res.json(id);
            }

        }
    }


    removeFromCart(req, res){
        const authorization = ClientDashboardMapper.authorizeToken(req.headers.authorization);

        if(!authorization.success){
            return res.status(401).json(authorization);
        }
        else{
            let user = UserMapper.activeUsersRegistry.getUser(req.body.username);

            let id = user.removeFromCart(req.body.serialNumber);

            let product = ClientDashboardMapper.productListing.getModel(req.body.modelNumber);
            //TODO figure this out

            product.restoreId(id.SerialNumber);

        }
    }



};
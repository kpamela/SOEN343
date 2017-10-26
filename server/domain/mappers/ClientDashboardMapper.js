/**
 * Created by CharlesPhilippe on 2017-10-23.
 */
const Catalogue = require('./CatalogueMapper.js'),
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
        return super.routes.concat([[]])


    }

    constructor(options={}) {
        super(options);

    }

};
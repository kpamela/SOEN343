/**
 * Created by CharlesPhilippe on 2017-10-22.
 */
const Catalogue = require('./CatalogueMapper.js'),
    DesktopComputer =  require('../classes/ProductClasses/DesktopComputer'),
    LaptopComputer = require('../classes/ProductClasses/LaptopComputer'),
    TabletComputer = require('../classes/ProductClasses/TabletComputer'),
    Monitor = require('../classes/ProductClasses/television');


module.exports = class AdminDashboardMapper extends Catalogue{

    get middlewares(){
        return super.middlewares;
    }

    get routes(){
        return super.routes.concat([['post', '/add','add']])


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


            //TODO TDG calls and proper identyMap
            AdminDashboardMapper.productListing.push(req.body.data);


            return res.json(AdminDashboardMapper.productListing);

        }

    }



    static addNewProduct(category, newProduct){
        switch(category){
            case 'DesktopComputer':
                return new DesktopComputer(newProduct);

            case 'TabletComputer':
                return new TabletComputer(newProduct);

            case 'LaptopComputer':
                return new LaptopComputer(newProduct);

            case 'Television':
                return  new Television(newProduct);

            case 'Monitor':
                return new Monitor(newProduct);

        }
    }

}


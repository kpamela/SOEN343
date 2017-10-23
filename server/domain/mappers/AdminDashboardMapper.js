/**
 * Created by CharlesPhilippe on 2017-10-22.
 */
const Catalogue = require('./CatalogueMapper.js');

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
            let newProduct = {category: req.body.data.category, amount: req.body.data.amount};
            for(let i in req.body.data.description){
                newProduct[i] = req.body.data.description[i];
            }

            let product = this.addNewProduct(category);


            //TODO TDG calls and proper identyMap
            AdminDashboardMapper.productListing.push(product);


            return res.json(AdminDashboardMapper.productListing);

        }

    }



    addNewProduct(category){
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


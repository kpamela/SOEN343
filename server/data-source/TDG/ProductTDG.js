/*
 Created by kpamela on 2017-10-20.
*/
const mysql   = require('mysql'),
      handler = require('./handler.js');


class ProductTDG{

  /****************************************
                  Read
  ****************************************/

  SQLget_product(){                                                         //Retrieves every single product in the database
    let productInfo = {
      sql: `SELECT * FROM products, models
            WHERE products.ModelNumber = models.ModelNumber
            AND products.Available = 1`
    };
    return handler.handleRead(productInfo);

  }


  SQLget_product(modelNumber){                                              //Retrieves all products of a specific model
      let productInfo = {
        sql: `SELECT * FROM products
              inner join models on models.ModelNumber = products.ModelNumber
              WHERE models.ModelNumber = ?
              AND products.Available = 1`,
        timeout: 40000,
        values: [modelNumber]};
      return handler.handleRead(productInfo, connection);

  }

  /****************************************
                Write
  ****************************************/

  SQLadd_product(modelNumber, quantity){                                        // Will add the specified amount of products into the database, with unique serial numbers
    let addProduct = '';
      handler.handleWrite(addProduct);
  }


  SQLdelete_product(modelNumber){                                               //Will remove all products from the database of a certain modelNumber
    let deleteProduct = '';
      handler.handleWrite(deleteProduct);
  }

  SQLdelete_product(modelNumber, quantity){                                     //Will remove the specified amount of products from the database of a certain model number
    let deleteProduct = '';
      handler.handleWrite(deleteProduct);
  }

}
module.exports = ProductTDG;

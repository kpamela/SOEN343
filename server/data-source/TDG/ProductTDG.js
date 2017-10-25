/*
 Created by kpamela on 2017-10-20.
*/
const mysql = require('mysql'),
      handler = require('./handler.js'),
        db = require('../config/database.js');


class ProductTDG{

  /****************************************
                  Read
  ****************************************/

  SQLget_product(){                                                         //Retrieves every single product in the database
      db.getConnection((err, connection) => {
          let productInfo = {
            sql: `SELECT * FROM products, models
                  WHERE products.ModelNumber = models.ModelNumber
                  AND products.Available = 1`
          };
          handler.handleRead(productInfo, connection);
      });
  }


  SQLget_product(modelNumber){                                                  //Retrieves products of a specific model
      db.getConnection((err, connection) => {
          let productInfo = {
            sql: `SELECT * FROM products
                  WHERE modelsModelNumber = ?
                  AND products.ModelNumber = models.ModelNumber
                  AND products.Available = 1`, value: [modelNumber]};
          handler.handleRead(productInfo, connection);
      });
  }


  /****************************************
                Write
  ****************************************/

  SQLadd_product(modelNumber, quantity){                                        // Will add the specified amount of products into the database, with unique serial numbers
    let addProduct = '';
      handler.handleWrite(addProduct,connection);
  }


  SQLdelete_product(modelNumber){                                               //Will remove all products from the database of a certain modelNumber
    let deleteProduct = '';
      handler.handleWrite(deleteProduct,connection);
  }

  SQLdelete_product(modelNumber, quantity){                                     //Will remove the specified amount of products from the database of a certain model number
    let deleteProduct = '';
      handler.handleWrite(deleteProduct,connection );
  }

}
module.exports = ProductTDG;

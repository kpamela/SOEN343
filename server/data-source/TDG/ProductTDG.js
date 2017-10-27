/*
 Created by kpamela on 2017-10-20.
*/
const mysql   = require('mysql'),
      handler = require('./handler.js');


class ProductTDG{

  /****************************************
                  Read
  ****************************************/

  SQLget_products(){                                                         //Retrieves every single product in the database
    let productInfo = {
      sql: `SELECT * FROM products, models
            WHERE products.ModelNumber = models.ModelNumber
            AND products.Available = 1`
    };
    return handler.handleRead(productInfo);

  }


  SQLget_products(modelNumber){                                              //Retrieves all products of a specific model
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

  SQLadd_products(modelNumber, quantity){                                        // Will add the specified amount of products into the database, with unique serial numbers
      // Build the appropriate number of products to put in the product table
      var products = [];
      for (var i = 0; i < quantity; i++){
          console.log(i);
          if (!products[i]){
              products[i] = [];
          }
          products[i][0] = modelNumber;
          products[i][1] = 1;
      }
      sql = "INSERT INTO products (ModelNumber, Available) VALUES ?";
      handler.handleWrite(sql, [products]);
  }


  SQLdelete_products(modelNumber){                                               //Will remove all products from the database of a certain modelNumber
    let deleteProduct = {sql: `DELETE FROM models WHERE models.ModelNumber = ?`,
                         values:[modelNumber]};
      handler.handleWrite(deleteProduct);
  }

  SQLdelete_products(modelNumber, quantity){                                     //Will remove the specified amount of products from the database of a certain model number
    let deleteProduct = {sql: `Call deleteProducts(?,?)`,
                        values:[modelNumber, quantity]};
      handler.handleWrite(deleteProduct);
  }

}
module.exports = ProductTDG;

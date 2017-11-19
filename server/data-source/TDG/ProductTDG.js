/*
 Created by kpamela on 2017-10-20.
*/
const mysql   = require('mysql'),
      handler = require('./handler.js'),
      jquery = require('jquery-deferred');


class ProductTDG{

  /****************************************
                  Read
  ****************************************/

  SQLget_products(){
    let data = new jquery.Deferred();                                                        //Retrieves every single product in the database
    let productInfo = `SELECT * FROM products, models
                       WHERE products.ModelNumber = models.ModelNumber
                       AND products.Available = 1`;
    handler.handleRead(productInfo, data);
    return data;
  }

  SQLget_products(modelNumber){                                              //Retrieves all products of a specific model
      let data = new jquery.Deferred();
      let productInfo = {
        sql: `SELECT * FROM products
              inner join models on models.ModelNumber = products.ModelNumber
              WHERE products.ModelNumber = ?
              AND products.Available = 1`,
        timeout: 40000,
        values: [modelNumber]};
      handler.handleRead(productInfo, data);
      return data;

  }

  SQLgetSingle_products(modelNumber){
      let data = new jquery.Deferred();
      let productInfo = {
        sql: `SELECT * FROM products
              inner join models on models.ModelNumber = products.ModelNumber
              WHERE products.ModelNumber = ?
              AND products.Available = 1
              LIMIT 1`,
        timeout: 40000,
        values: [modelNumber]};
      handler.handleRead(productInfo, data);
      return data;
  }

  /****************************************
                Write
  ****************************************/

  SQLadd_products(modelNumber, quantity){                                        // Will add the specified amount of products into the database, with unique serial numbers
      let data = new jquery.Deferred();
      let addProduct = { sql:`Call addProducts(?,?)`,
                       values:[modelNumber,quantity]};
      handler.handleWrite(addProduct, data);
      return data;
  }

  SQLaddSpecific_products(product){                                               //Adds a product into the database
        let data = new jquery.Deferred();
        let addInfo = {sql: "INSERT INTO products SET ?",
            values: [product]};
        handler.handleWrite(addInfo, data);
        return data;
    }


  SQLdelete_products(modelNumber){                                               //Will remove all products from the database of a certain ModelNumber
      let data = new jquery.Deferred();
      let deleteProduct = {sql: `DELETE FROM products WHERE products.ModelNumber = ?`,
                         values:[modelNumber]};
      handler.handleWrite(deleteProduct, data);
      return data;
  }

    SQLdeleteSingle_products(serialNumber){
        let data = new jquery.Deferred();
        let deleteProduct = {sql: `DELETE FROM products WHERE products.SerialNumber = ?`,
                            values:[serialNumber]};
        handler.handleWrite(deleteProduct, data);
        return data;
    }

  SQLdelete_products_Quantity(modelNumber, quantity){                                     //Will remove the specified amount of products from the database of a certain model number
    let deleteProduct = {sql: `Call deleteProducts(?,?)`,
                        values:[modelNumber, quantity]};
      handler.handleWrite(deleteProduct);
  }

}
module.exports = ProductTDG;

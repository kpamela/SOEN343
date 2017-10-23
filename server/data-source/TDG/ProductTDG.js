/*
 Created by kpamela on 2017-10-20.
*/
const mysql = require('mysql'),
      handler = require('/handler.js');


class ProductTDG{

  /****************************************
                  Read
  ****************************************/


  SQLget_product_All(){                                                         //Retrieves every single product in the database
    let productInfo = `SELECT * FROM products, models
                     WHERE products.ModelNumber = models.ModelNumber AND products.Available = 1`
    handleRead(productInfo);
  }


  SQLget_product_Category(category){                                             //Retrieves products of a specific category
    let productInfo = `SELECT * FROM products
                     WHERE models.Discriminator = category AND products.ModelNumber = models.ModelNumber AND products.Available = 1`
    handleRead(modelInfo);
  }


  /****************************************
                Write
  ****************************************/

  SQLadd_product(modelNumber, quantity){                                        // Will add the specified amount of products into the database, with unique serial numbers
    let addProduct = '';
    handleWrite(addProduct);
  }

  SQLmodify_product(product){
    let addProduct = 'INSERT INTO models SET ?';
    handleWrite(product);
  }

  SQLdelete_product(modelNumber){                                               //Will remove a single product from the database
    let deleteProduct = '';
    handleWrite(deleteProduct);
  }

  SQLdelete_product(modelNumber, quantity){                                     //Will remove the amount of products specified from the database
    let deleteProduct = '';
    handleWrite(deleteProduct);
  }

  SQLdelete_product(modelNumber, quantity){                                     //Will remove the specified amount of products from the database
    let deleteProduct = '';
    handleWrite(deleteProduct);
  }

}
module.exports = ProductTDG;

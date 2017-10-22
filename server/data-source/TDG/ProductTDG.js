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
    let productInfo = `SELECT * FROM products`;
    handleRead(productInfo);
  }

  SQLget_product_All(){
    let productInfo = '';                                                       //Retrieves all products with a certain model number
    handleRead(productInfo)
  }


  /****************************************
                Write
  ****************************************/

  SQLadd_product(modelNumber, quantity){                                        // Will add the specified amount of products into the database, with unique serial numbers
    let addProduct = '';
    handleWrite(addProduct);
  }

  SQLmodify_product_modelNumber(modelNumber, modification){                      //Will modify all products with the same model number
    let modifyProduct = '';
    handleWrite(modifyProduct);
  }

  SQLdelete_product(modelNumber){
    let deleteProduct = '';
    handleWrite(deleteProduct);
  }




}
module.exports = ProductTDG;

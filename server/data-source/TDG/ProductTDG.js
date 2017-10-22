/*
 Created by kpamela on 2017-10-20.
*/
const mysql = require('mysql'),
      handler = require('/handler.js');


class ProductTDG{

  /****************************************
                  Read
  ****************************************/
     
  //Retrieves every single product in the database
  SQLget_product_All(){  
    let modelInfo = `Select * From products, models 
                     WHERE products.ModelNumber = models.ModelNumber AND products.Available = 1`
    handleRead(productInfo);  
  }

  SQLget_model_Category(category){
    let modelInfo = `Select * From products, models
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

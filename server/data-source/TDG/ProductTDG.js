/*
 Created by kpamela on 2017-10-20.
*/
const mysql = require('mysql'),
      handler = require('./handler.js');


class ProductTDG{

  /****************************************
                  Read
  ****************************************/
  SQLget_product_All(){
    let productInfo = `SELECT * FROM models`;
    handler.handleRead(productInfo);
  }

  SQLget_product_Monitors(){
    let monitors = '';
      handler.handleRead(monitors);
  }
  SQLget_product_Tablets(){
    let tablets = '';
      handler.handleRead(tablets);
  }
  SQLget_product_Desktops(){
    let desktops = '';
  }
  SQLget_product_Laptops(){
    let laptops = '';
      handler.handleRead(laptops);
  }


  /****************************************
                Write
  ****************************************/

  SQLadd_product(modelNumber, quantity){                                        // Will add the specified amount of products into the database, with unique serial numbers
    let addProduct = '';
      handler.handleWrite(addProduct);
  }

  SQLmodify_product(product){
    let addProduct = 'INSERT INTO models SET ?';
      handler.handleWrite(product);
  }





}
module.exports = ProductTDG;

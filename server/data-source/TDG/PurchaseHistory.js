/*
 Created by kpamela on 2017-11-07.
*/
const mysql = require('mysql'),
      handler = require('./handler.js');
      jquery = require('jquery-deferred');


class PurchaseHistoryTDG{

  /****************************************
                  Read
  ****************************************/

  SQLget_purchases_All(username){
    let data = new jquery.Deferred();
    let purchases = {sql:'SELECT * FROM purchasehistory WHERE purchasehistory.Username = ?',
                    values: [username]};
    handler.handleRead(purchases, data);
    return data;
  }

    SQLgetSingle_purchase(username, serialNumber){
        let data = new jquery.Deferred();
        let product = {sql: `SELECT * FROM purchasehistory WHERE Username = ? AND SerialNumber = ? LIMIT 1`,
            values:[username, serialNumber]};
        handler.handleWrite(product, data);
        return data;
    }

  /****************************************
                Write
  ****************************************/

  SQLadd_purchases(purchase){
    let data = new jquery.Deferred();
    let addPurchase = {sql:'INSERT INTO purchasehistory SET ?',
                        values: [purchase]};
    handler.handleWrite(addPurchase, data);
    return data;
    }

  SQLset_purchases_isReturned(username, serialNumber, bool){
    let data = new jquery.Deferred();
    let setReturned = {sql:'UPDATE purchasehistory SET isReturned = ?'
                    + ' WHERE SerialNumber = ?'
                    + ' AND Username =  ?',
                        values:[bool, serialNumber, username]};
    handler.handleWrite(setReturned, data);
    return data;
  }

}
module.exports = PurchaseHistoryTDG;

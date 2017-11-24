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

    SQLgetSingle_purchase(username, purchaseId){
        let data = new jquery.Deferred();
        let product = {sql: `SELECT * FROM purchasehistory WHERE Username = ? AND PurchaseID = ? LIMIT 1`,
            values:[username, purchaseId]};
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

  SQLset_purchases_isReturned(username, purchaseId, bool){
    let data = new jquery.Deferred();
    let setReturned = {sql:'UPDATE purchasehistory SET IsReturned = ?'
                    + ' WHERE PurchaseID = ?'
                    + ' AND Username =  ?',
                        values:[bool, purchaseId, username]};
    handler.handleWrite(setReturned, data);
    return data;
  }

}
module.exports = PurchaseHistoryTDG;

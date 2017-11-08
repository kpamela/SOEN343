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
    let setReturned = {sql:'UPDATE purchasehistory SET isReturned = ' + bool
                    + ' WHERE SerialNumber = ' + serialNumber
                    + ' AND Username =  ' + username };
    handler.handleWrite(setReturned, data);
    return data;
  }

}
module.exports = PurchaseHistoryTDG;

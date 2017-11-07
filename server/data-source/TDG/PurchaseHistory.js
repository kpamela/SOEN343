/*
 Created by kpamela on 2017-11-07.
*/
const mysql = require('mysql'),
      handler = require('/handler.js');
      jquery = require('jquery-deferred');


class PurchaseHistoryTDG{

  /****************************************
                  Read
  ****************************************/

  SQLget_purchases_All(userID){
    let data = new jquery.Deferred();
    let purchases = 'SELECT * FROM purchasehistory WHERE UserID = ' + userID;
    hanler.handleRead(purchases, data);
    return data;
  }

  /****************************************
                Write
  ****************************************/

  SQLadd_purchases(purchase){
    let data = new jquery.Deferred();
    let addPurchase = 'INSERT INTO purchasehistory SET' + purchase;
    handler.handleWrite(addPurchase, data);
    return data;
    }

  SQLset_purchases_isReturned(userID, serialNumber, bool){
    let data = new jquery.Deferred();
    let setReturned = 'UPDATE purchasehistory SET isReturned = ' + bool + 'WHERE SerialNumber = serialNumber';
    handler.handleWrite(setReturned, data);
    return data;
  }

}
module.exports = PurchaseHistoryTDG;

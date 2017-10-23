/*
 Created by kpamela on 2017-10-22.
*/
const mysql = require('mysql'),
      handler = require('/handler.js');


class AddressTDG{

  /****************************************
                  Read
  ****************************************/
  SQLget_address_All(userID){                                                  //Retrieves address of a single user
    let addressInfo = '';
    handleRead(addressInfo);
  }

  /****************************************
                Write
  ****************************************/

  SQLadd_address(userID, address){                                            // Will add the address and link it to the user
    let addAddress = '';
    handleWrite(addAddress);
  }

  SQLmodify_address(address, column, modification){                            //Edit a specific element of the address
    let modifyAddress = '';
    handleWrite(modifyAddress);
  }

  SQLdelete_address(userID){                                                  //Delete row of address linked to a user
    let deleteAddress = '';
    handleWrite(deleteAddress);
  }

}
module.exports = AddressTDG;

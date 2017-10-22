/*
 Created by kpamela on 2017-10-20.

 aur = active user registry
*/
const mysql = require('mysql'),
      handler = require('/handler.js');


class ActiveUsersRegistryTDG{

  /****************************************
                  Read
  ****************************************/
  SQLget_aur_All(){                                                             //Retrieves every single active user
    let aurInfo = `SELECT * FROM `;
    handleRead(aurInfo);
  }


  /****************************************
                Write
  ****************************************/

  SQLadd_aur(username, timestamp){                                                  //Adds an online user to the active user registry at the time logged in
    let addAUR = '';
    handleWrite(addAUR);
  }

  SQLdelete_aur(username){
    let deleteAUR = '';
    handleWrite(deleteAUR);
  }


}
module.exports = ActiveUsersRegistryTDG;

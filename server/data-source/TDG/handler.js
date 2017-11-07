/*
 Created by kpamela on 2017-10-20.
*/
const mysql   = require('mysql'),
      db      = require('../config/database.js');
let _writing = false;
module.exports = {
    handleRead: function (sql, data) {

        while(_writing){}//busy wait
       db.getConnection((err, connection) => {
          connection.query(sql, (err, result) => {
              if (err) {
                  console.log(err);
                  data.resolve(err);
              }
              else {
                  console.log("Successful read");
                    data.resolve(result);
                  //return results;
              }
          });
      });
    },

    handleWrite: function (sql, data) {

        while(_writing){}//busy wait
      db.getConnection((err, connection) => {
            _writing = true;
          connection.query(sql,(err, result) => {
              _writing = false;

              if (err) {
                  console.log(err);
                  data.resolve(err);
              }
              else {
                  console.log("Successfully modified the database!");
                  console.log(result);
                  data.resolve(result);
              }

          });
      });
    }
};

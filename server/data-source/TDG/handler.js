/*
 Created by kpamela on 2017-10-20.
*/
const mysql   = require('mysql'),
      db      = require('../config/database.js');

module.exports = {
    handleRead: function (input, data) {
       db.getConnection((err, connection) => {
          connection.query(input, (err, results, fields) => {
              if (err) {
                  console.log(err);
                  data.resolve(err);
              }
              else {
                  console.log("Successful read");
                    data.resolve(results);
                  //return results;
              }
          });
      });
    },

    handleWrite: function (input, data) {
      db.getConnection((err, connection) => {                               // Unsure if this needs to be returned
          connection.query(input, (err, results, fields) => {
              if (err) {
                  console.log(err);
                  data.resolve(err);
              }
              else {
                  console.log("Successfully modified the database!");
                  console.log(results);
                  data.resolve(results);
              }
          });
      });
    }
}

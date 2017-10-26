/*
 Created by kpamela on 2017-10-20.
*/
const mysql   = require('mysql'),
      db      = require('../config/database.js');

module.exports = {
    handleRead: function (input, connection) {
      db.getConnection((err, connection) => {
          connection.query(input, (err, results, fields) => {
              if (err) {
                  console.log(err);
                  return err;
              }
              else {
                  console.log("Successful read");
                  console.log(result);
                  return result;
              }
          });
      });
    },

    handleWrite: function (input, connection) {
      db.getConnection((err, connection) => {                               // Unsure if this needs to be returned
          connection.query(input, (err, results, fields) => {
              if (err) {
                  console.log(err);
                  return err;
              }
              else {
                  console.log("Successfully modified the database!");
                  console.log(result);
                  return result;
              }
          });
      });
    }
}

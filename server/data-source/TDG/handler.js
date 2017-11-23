/*
 Created by kpamela on 2017-10-20.
*/
const mysql   = require('mysql'),
      db      = require('../config/database.js');


const meld = require('meld');
let writingQueue = [];
let writing = false;
module.exports  = class handler{
    constructor(){

    }

    static handleRead(sql, data) {

       // while(_writing){}//busy wait
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
              connection.release();
          });
      });
    }

    static handleWrite(sql, data) {

        console.log('writing');
        db.getConnection((err, connection) => {

          connection.query(sql,(err, result) => {
                writing = false;
                console.log('done');
              if (err) {
                  console.log(err);
                  data.resolve(err);
              }
              else {

                  console.log("Successfully modified the database!");
                  console.log(result);
                  data.resolve(result);
              }

              connection.release();

          });
      });
    }
};

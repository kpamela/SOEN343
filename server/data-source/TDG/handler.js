/*
 Created by kpamela on 2017-10-20.
*/
const mysql = require('mysql');

export function handleRead(input){
  connection.query(sql, input, (err, result) => {
      if(err){
          console.log(err);
      }
      else{
        console.log("Successful read");
      }
  });
}

export function handleWrite(input){
  connection.query(sql, input, (err, result) => {
      if(err){
          console.log(err);
      }
      else{
        console.log("Successful write to database");
        return input;
      }
  });
}

const mysql = require('mysql');


function SQLget_user_all(username){
  let userInfo = `SELECT * FROM users WHERE Username = '${username}' LIMIT 1`;
  return userInfo;
}

function SQLget_user_password(username){
  let userInfo = `SELECT Password FROM users WHERE Username = '${username}' LIMIT 1`;
  return userInfo;
}

module.exports = UserTDG;

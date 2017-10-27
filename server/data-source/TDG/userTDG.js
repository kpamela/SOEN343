const mysql = require('mysql'),
      bcrypt = require('bcryptjs'),
      db = require('../../data-source/config/database.js'),
      jwt = require('jsonwebtoken');

class UserTDG{

  /****************************************
                  Read
  ****************************************/
  SQLget_users(username){
    let userInfo = "SELECT * FROM users WHERE Username = " + username + " LIMIT 1";
    handler.handleRead(newUser);
  }

  /****************************************
                  Write
  ****************************************/
  SQLadd_users(user, password){
    if (SQLget_users(user.Username)!=null){
      let newUser = "INSERT INTO users SET" + userInfo;
      bcrypt.hash(password, 10, (err, hash) => {
          if(err) throw err;
          password = hash;
      let hashPassword = `INSERT INTO users SET`;
      handler.handleWrite(newUser);
      handleWrite(hashPassword);
      console.log("Successfully registered user");
    }
    else{
      console.log("user already exists");
    }
  }

/*
  SQLset_users_Password(username,password){
    let setUserPassword = "SELECT Password FROM users WHERE Username = " + username + " LIMIT 1"

    db.getConnection((err, connection) => {
        userPassword(username);
        connection.query(userPassword(username), (err, user) => {
            if(err) throw err;
                let sql = `INSERT INTO users SET ?`;
                bcrypt.hash(password, 10, (err, hash) => {
                    if(err) throw err;
                    password = hash;
                    // Add user
                    connection.query(sql, password, (err, result) => {
                        if(err){
                            console.log(err);
                            resolve({success: false, msg: "Failed to register user"});
                        }
                        else{
                            resolve({success: true, msg: "User registered"});
                        }
                    });
                });
        });
    });
  }
*/
}
module.exports = UserTDG;

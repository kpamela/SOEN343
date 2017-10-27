const mysql = require('mysql'),
      bcrypt = require('bcryptjs'),
      db = require('../../data-source/config/database.js'),
      jwt = require('jsonwebtoken'),
        jquery = require('jquery-deferred'),
    handler = require('./handler.js');

class UserTDG{

  /****************************************
                  Read
  ****************************************/
  SQLget_users(username){
      let data = new jquery.Deferred();
    let userInfo = {sql:"SELECT * FROM users WHERE Username = ? LIMIT 1",
                    values: username};
    handler.handleRead(userInfo, data);
    return data;
  }

  /****************************************
                  Write
  ****************************************/
  SQLadd_users(user){
      let data = new jquery.Deferred();
    let newUser = {sql: "INSERT INTO users SET ?",
                    values: user};
    handler.handleWrite(newUser,data);
    return data
  }

  SQLset_users_Password(username){
    let setUserPassword = "SELECT Password FROM users WHERE Username = " + username + " LIMIT 1";

    db.getConnection(userPassword, (err, connection) => {
        userPassword(username);
        connection.query(userPassword(username), (err, user) => {
            if(err) throw err;
            if(user.length == 0){
                let sql = `INSERT INTO users SET ?`;
                bcrypt.hash(this.password, 10, (err, hash) => {
                    if(err) throw err;
                    this.password = hash;
                    // Add user
                    connection.query(sql, this, (err, result) => {
                        if(err){
                            console.log(err);
                            resolve({success: false, msg: "Failed to register user"});
                        }
                        else{
                            resolve({success: true, msg: "User registered"});
                        }
                    });
                });
            }
            else {
                if(this.username == user[0].Username){
                    resolve({success: false, msg: "Username already exists"});
                }
            }
        });
    });
  }

}
module.exports = UserTDG;

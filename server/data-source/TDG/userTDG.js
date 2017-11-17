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
  SQLget_users_All(username){
      let data = new jquery.Deferred();
    let userInfo = {sql:"SELECT * FROM users"};
    handler.handleRead(userInfo, data);
    return data;
  }

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
  SQLadd_users(user) {
      let data = new jquery.Deferred();
      this.SQLget_users(user.Username).then(function(existingUser){
        if(existingUser != ''){
            data.resolve({failure: true, msg:"User already exists"});
        }
        else{
            bcrypt.hash(user.Password, 10, (err, hash) =>{

                if(err){
                    data.resolve(err);
                }
                user.Password = hash;//setting password to hashed password
                let newUser = {
                    sql: "INSERT INTO users SET ?",
                    values: [user]
                };
                handler.handleWrite(newUser, data);
        });

        }
      });
      return data;
  }

  SQLdelete_users(username) {
    let data = new jquery.Deferred();
    let deleteUser = {sql:"DELETE FROM users WHERE Username = ?",
                      values: username};
    handler.handleWrite(deleteUser, data);
    return data;

  }
 /* SQLadd_users(user, password){
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
            }
            else {
                if(this.username == user[0].Username){
                    resolve({success: false, msg: "Username already exists"});
                }
            }
        });
    });
  }
*/
}
module.exports = UserTDG;

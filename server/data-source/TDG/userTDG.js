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
    let userInfo = {sql:"SELECT * FROM users WHERE Username = ? and IsDeleted = 0 LIMIT 1",
                    values: username};
    handler.handleRead(userInfo, data);
    return data;
  }

  SQLget_users_any(username){
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
      this.SQLget_users_any(user.Username).then(function(existingUser){
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

  SQLdelete_users(username) {                              //Will update the IsDeleted status in the database
    let data = new jquery.Deferred();
    let updateUser = {sql:"UPDATE users SET IsDeleted = 1 WHERE Username = ?",
                         values: [username]};
      handler.handleWrite(updateUser,data);
      return data;
  }

}
module.exports = UserTDG;

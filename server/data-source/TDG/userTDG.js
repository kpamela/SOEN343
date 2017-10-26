const mysql = require('mysql'),
      bcrypt = require('bcryptjs'),
      db = require('../../data-source/config/database.js'),
      jwt = require('jsonwebtoken');

class UserTDG{

  /****************************************
                  Read
  ****************************************/
  SQLget_user_All(username){
    let userInfo = {sql:`SELECT * FROM users WHERE Username = ? LIMIT 1`,
                    values:[username]};
    return userInfo;
  }

  /****************************************
                  Write
  ****************************************/

  SQLadd_user(userInfo){
    let newUser = {sql:`INSERT INTO users SET ?`,
                  values:[userInfo];}
    handler.handleWrite(newUser);
  }

  SQLset_user_Password(username){
    let setUserPassword = {sql:`SELECT Password FROM users WHERE Username = ? LIMIT 1`,
                          values:[username]};

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

const express = require('express'),
    users = express.Router(),
    bcrypt = require('bcryptjs'),
    mysql = require('mysql'),                             // When all queries are moved to tdg, this can be removed
    db = require('../../data-source/config/database.js'),
    jwt = require('jsonwebtoken'),
    userTDG = require('../../data-source/TDG/UserTDG');
class User{
    constructor(user){
        this.username = user.Username;
        this.password = user.Password;
        this.firstName = user.FirstName;
        this.lastName = user.LastName;
        this.emailAddress = user.EmailAddress;
        this.phoneNumber = user.PhoneNumber;
        this.administrator = user.Administrator;
    }

    //Register the user in the DB
    register(){
        var promise = new Promise((resolve, reject) => {
            setTimeout(() => {
              SQLset_users_Password(this.username);
            });
        });
        return promise;
    }

    //Authenticates the user to the DB
    authenticate() {
        let usr = new userTDG();
        var promise = new Promise((resolve, reject) => {
            setTimeout(() =>{
                db.getConnection((err, connection) => {
                    //usr.SQLget_user_All(this.username);
                    connection.query(usr.SQLget_user_All(this.username), (err, user) => {
                        if(err) throw err;
                        if(user.length == 0){
                            resolve({success: false, msg: "User not found"});
                        }
                        bcrypt.compare(this.password, user[0].Password, (err, isMatch) => {
                            if(err) throw err;
                            if(isMatch){
                                const token = jwt.sign({user:user[0]}, 'mysecret', {expiresIn: 604800}); //1 week
                                resolve({
                                    success: true,
                                    token: 'JWT' + token,
                                    user:{
                                        username: user[0].Username,
                                        isAdmin: user[0].Administrator
                                    }
                                });
                            }
                            else{
                                resolve({success: false, msg: "Wrong password"});
                            }
                        });
                    });
                });
            });
        });
        return promise;
    }
}

module.exports = User;

const express = require('express'),
    users = express.Router(),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    db = require('../../data-source/config/database.js')
    userTDG = require('../../data-source/TDG/userTDG');
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
                db.getConnection((err, connection) => {
                  SQLget_user_all(this.username);
                    connection.query(getUserSQL, (err, user) => {
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
            });
        });
        return promise;
    }

    //Authenticates the user to the DB
    authenticate() {
        var promise = new Promise((resolve, reject) => {
            setTimeout(() =>{
                db.getConnection((err, connection) =>
                    SQLget_user_all(this.username);
                    connection.query(sql, (err, user) => {
                        if(err) throw err;
                        if(user.length == 0){
                            resolve({success: false, msg: "User not found"});
                        }
                        bcrypt.compare(this.password, SQLget_user_password(this.username), (err, isMatch) => {
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

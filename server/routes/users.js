const express = require('express'),
    users = express.Router(),
    mysql = require('mysql'),
    table = require('../models/users.js'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    db = require('../config/database.js');

db.getConnection((err, connection) => {

    // Create the users table
    users.get('/createtable', (req, res) => {
        let sql = table;
        connection.query(sql, (err, result) => {
            if(err) throw err;
            res.send(result);
        });
    });

    // Register user in the db
    users.post('/register', (req, res) => {
        let newUser = req.body;
        let getUserSQL = `SELECT * FROM users WHERE Username = '${newUser.Username}' LIMIT 1`;
        connection.query(getUserSQL, (err, user) => {
            if(err) throw err;
            if(user.length == 0){
                let sql = `INSERT INTO users SET ?`;
                bcrypt.hash(newUser.Password, 10, (err, hash) => {
                    if(err) throw err;
                    newUser.Password = hash;
                    // Add user
                    connection.query(sql, newUser, (err, result) => {
                        if(err){
                            console.log(err);
                            return res.json({success: false, msg: "Failed to register user"});
                        }
                        else{
                            return res.json({success: true, msg: "User registered"});
                        }
                    });
                });
            }
            else {
                    if(newUser.Username == user[0].Username){
                        return res.json({success: false, msg: "Username already exists"});
                    }
            }
        });
    });

    // Authenticate the user
    users.post('/authenticate', (req, res) => {
        const username = req.body.Username;
        const password = req.body.Password;
        let sql = `SELECT * FROM users WHERE Username = '${username}'`
        connection.query(sql, (err, user) => {
            if(err) throw err;
            if(user.length == 0){
                return res.json(401,{success: false, msg: "User not found"});
            }
            bcrypt.compare(password, user[0].Password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch){
                    const token = jwt.sign({user:user[0]}, 'mysecret', {expiresIn: 604800}); //1 week
                    res.json(200, {
                        success: true,
                        token: 'JWT' + token,
                        user:{
                            username: user[0].Username
                        }
                    });
                }
                else{
                    return res.json(401, {success: false, msg: "Wrong password"});
                }
            });
        });
    });

});

module.exports = users;

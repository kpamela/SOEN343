/**
 * Created by CharlesPhilippe on 2017-10-26.
 */
const express = require('express'),
    ClassBasedRouter = require('express-class-router'),
    //  products = express.Router(),
    passport = require('passport'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    UsersIdentityMap = require('../IdentityMaps/UsersIdentityMap.js'),
    UserTDG = require('../../data-source/TDG/userTDG.js'),
    User = require('../classes/user.js');
/**
 * List of all active users
 * @type {[]}
 */
let _activeUsersRegistry = [];
/**
 *
 * @type {UserTDG}
 */
let userTDG = new UserTDG();

module.exports = class UserMapper {

    /**
     * Returns the list of all active users
     * @returns {[]}
     */
    static get activeUsersRegistry(){
        return _activeUsersRegistry;
    }



    constructor() {



    }


    /**
     * Authenticating a user, checking for user name and password match found in database
     * Instantiates user, and push it to active user
     *
     * Should return its token, and user itself for use in the frontend
     *
     * @param req
     * @param res
     */
    authenticate(req, res){

        userTDG.SQLget_users(req.body.Username).then(function(user){
            if(user.length == 0){
                res.status(500).send("User Not found");
            }

            //checking password match
            bcrypt.compare(req.body.Password, user[0].Password, (err, isMatch) =>{
               if(err){
                   res.status(500);
               }
               else if(isMatch){
                   const token = jwt.sign({user:user[0]}, 'mysecret', {expiresIn:604800});
                   let activeUser = new User(user[0]);
                   console.log(activeUser);
                   UserMapper.activeUsersRegistry.push([activeUser.Username, new Date().toISOString]);
                   res.json({success: true, token: token, user: activeUser})

               }
               else{
                   res.status(500).send('wrong password');
               }
            });
        })

    }


    /**
     * Registering a new user that doesn't exist in database
     * Upon successful termination, user should be instanciated and pushed to active usersRegistry
     *
     * @param req
     * @param res
     */
    registerUser(req, res){

        let newUser = new User(req.body);

        console.log(req.body);

        //TODO should handle already existing users
        userTDG.SQLadd_users(newUser).then(function(res){
            console.log(res);
        });
        //userTDG.SQLset_user_Password(newUser.userName(), newUser.password);

        const token = jwt.sign({user:newUser}, 'mysecret', {expiresIn:604800});

        UserMapper.activeUsersRegistry.push([newUser.Username, new Date().toISOString()]);
        return res.json({success: true, token: token, user: newUser})

    }

    getActiveUsersRegistry(req, res){
        res.json(UserMapper.activeUsersRegistry);
    }

    logout(req, res){
        for(let i = 0; i < UserMapper.activeUsersRegistry.length; i++){
            if(UserMapper.activeUsersRegistry[i][0] === req.body.username){
                UserMapper.activeUsersRegistry.splice(i, 1);
                return res.send('logged out');
            }
        }
        return res.status(500).send("user not found");
    }

};

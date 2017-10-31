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
 * @type {UsersIdentityMap}
 */
let _activeUsersRegistry = new UsersIdentityMap();
/**
 *
 * @type {UserTDG}
 */
let userTDG = new UserTDG();

module.exports = class UserMapper extends ClassBasedRouter{

    /**
     * Returns the list of all active users
     * @returns {UsersIdentityMap}
     */
    static get activeUsersRegistry(){
        return _activeUsersRegistry;
    }

    get middlewares(){
        return [
            ['get','/', 'middleware']
        ]
    }

    get routes(){
        return[
            ['post','/authenticate', 'authenticate'],
            ['post', '/register', 'registerUser']
        ]
    }

    constructor(options={}) {
        super(options);
        this.register(this.middlewares);
        this.register(this.routes);
    }


    //TODO middleware
    middleware(req, res, next){
        console.log('middleware triggered!');
        next();
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
                   UserMapper.activeUsersRegistry.add(activeUser);
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

        UserMapper.activeUsersRegistry.add(newUser);
        res.json({success: true, token: token, user: newUser})

    }


};
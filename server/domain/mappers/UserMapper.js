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

let _activeUsersRegistry = new UsersIdentityMap();
let userTDG = new UserTDG();

module.exports = class UserMapper extends ClassBasedRouter{

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

    authenticate(req, res){

        console.log(req.body);
        userTDG.SQLget_users(req.body.Username).then(function(user){
            if(user.length == 0){
                return res.status(500).json({success:false, msg:'User Not found'});
            }

            bcrypt.compare(req.body.Password, user[0].Password, (err, isMatch) =>{
               if(err){
                   res.status(500);
               }
               else if(isMatch){
                   const token = jwt.sign({user:user[0]}, 'mysecret', {expiresIn:604800});
                   let activeUser = new User(user[0]);
                   console.log(activeUser);
                   UserMapper.activeUsersRegistry.add(activeUser);
                   return res.json({success: true, token: token, user: activeUser})
               }
               else{
                   return res.status(500).json({success:false, msg:'Wrong password'});
               }
            });
        })

    }

    registerUser(req, res){

      console.log(req.body);
        let newUser = new User(req.body);

        console.log(req.body);

        userTDG.SQLadd_users(newUser).then(function(res){
            console.log(res);
        });
        //userTDG.SQLset_user_Password(newUser.userName(), newUser.password);

        const token = jwt.sign({user:newUser}, 'mysecret', {expiresIn:604800});

        UserMapper.activeUsersRegistry.add(newUser);
        return res.json({success: true, token: 'JWT' + token, user: newUser})

    }


};

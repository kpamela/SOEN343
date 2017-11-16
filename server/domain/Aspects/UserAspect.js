/**
 * Created by CharlesPhilippe on 2017-11-05.
 */
const meld = require('meld'),
    CatalogueAspect = require('./CatalogueAspect'),
    AdminDashboardMapper = require('../mappers/AdminDashboardMapper.js'),
    UserMapper = require('../mappers/UserMapper');

module.exports = class UserAspect{

    constructor(mapper){
        this.aroundCheck = this.aroundCheck.bind(this);
        this.mapper = mapper;
        meld.around(mapper, 'authenticate', this.aroundCheck);
        meld.around(mapper, 'registerUser', this.aroundCheck);

        meld.on(mapper, 'deleteAccount', this.onLogout);
        meld.on(mapper, 'logout', this.onLogout);


    }

    aroundCheck(){
        let joinpoint = meld.joinpoint();
        let req = joinpoint.args[0];
        let res = joinpoint.args[1];
        let index = CatalogueAspect.activeUsers.findUser(req.body.Username);
        if(index > -1){
            return res.json({success: false, msg:"User is already logged in"});
        }
        else{
            meld.around(res, 'json', function(){//pushing to activeUsers identityMap after authentication
                let joinpoint = meld.joinpoint();
                let ob1 = joinpoint.args[0];
                if(ob1.user){
                    let tmp = CatalogueAspect.addNewActiveUser(ob1.user);//adviception
                    if(!tmp){//occurs when an admin is already logged in
                        ob1 = {success: false, msg:"An Admin is already logged in"};//setting msg
                        return joinpoint.proceed(ob1);
                    }
                }
                joinpoint.proceed();
            });//if not returned, everything is fine;
           joinpoint.proceed();
        }
    }


    onLogout(req, res){
        //console.log(CatalogueAspect.activeUsers.content," onLogout");
        let user = CatalogueAspect.activeUsers.popUser(req.body.username);
        if(user.Administrator === 0){//log out for clients
            let cart = user.getCart();
            for(let i = 0; i<cart.length; i++){
                cart[i].Available = 1;//restoring availability;
            }
        }
        else{//log out for admins
            AdminDashboardMapper.admin = null;
        }
        console.log(CatalogueAspect.activeUsers.content," onLogout");
    }


};
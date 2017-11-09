/**
 * Created by CharlesPhilippe on 2017-11-05.
 */
const meld = require('meld'),
    CatalogueAspect = require('./CatalogueAspect'),
    UserMapper = require('../mappers/UserMapper');

module.exports = class UserAspect{

    constructor(mapper){
        this.aroundCheck = this.aroundCheck.bind(this);
        this.mapper = mapper;
        meld.around(mapper, 'authenticate', this.aroundCheck);
        meld.around(mapper, 'registerUser', this.aroundCheck);


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
            meld.on(res, 'json', function(ob1){//pushing to activeUsers identityMap
                if(ob1.user){
                    CatalogueAspect.activeUsers.add(ob1.user);//adviception
                }

            });
           joinpoint.proceed();
        }
    }


    onLogout(req, res){
        //console.log(CatalogueAspect.activeUsers.content," onLogout");
        let user = CatalogueAspect.activeUsers.popUser(req.body.username);
        let cart = user.getCart();
        for(let i = 0; i<cart.length; i++){
            cart[i].Available = 1;//restoring availability;
        }
        console.log(CatalogueAspect.activeUsers.content," onLogout");
    }
};
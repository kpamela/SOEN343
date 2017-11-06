/**
 * Created by CharlesPhilippe on 2017-11-05.
 */
const meld = require('meld'),
    ClientDashboardAspect = require('./ClientDashboardAspect'),
    UserMapper = require('../mappers/UserMapper');

module.exports = class UserAspect{

    constructor(mapper){
        meld.around(mapper, 'authenticate', this.aroundCheck);
        meld.around(mapper, 'registerUser', this.aroundCheck);


        meld.on(mapper, 'logout', this.onLogout);
    }

    aroundCheck(){
        let joinpoint = meld.joinpoint();
        let req = joinpoint.args[0];
        let res = joinpoint.args[1];
        let index = ClientDashboardAspect.activeUsers.findUser(req.body.Username);
        if(index > -1){
            return res.json({success: false, msg:"User is already logged in"});
        }
        else{
            meld.on(res, 'json', function(ob1){//pushing to activeUsers identityMap
                ClientDashboardAspect.activeUsers.add(ob1.user);//adviception
            });
           console.log(joinpoint.proceed());
        }
    }


    onLogout(req, res){
        ClientDashboardAspect.activeUsers.removeUser(req.body.username);
        console.log(ClientDashboardAspect.activeUsers.content);
    }
};
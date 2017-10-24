/**
 * Created by CharlesPhilippe on 2017-10-23.
 */


module.exports = class IdentityMap{

    constructor(content){

        this.content = [];

        if(content){//specified content
            this.content = content
        }

    }

    add(ob1){
        this.content.push(ob1);
    }

};
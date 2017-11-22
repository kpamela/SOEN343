/**
 * Created by CharlesPhilippe on 2017-11-12.
 */
const User = require("./user.js");


module.exports = class Admin extends User{

    constructor(user){
        super(user);

    }
};

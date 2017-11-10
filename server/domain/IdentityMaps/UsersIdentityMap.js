/**
 * Created by CharlesPhilippe on 2017-10-26.
 */
const IdentityMap = require('./IdentityMap');

module.exports = class UsersIdentityMap extends IdentityMap{

    constructor(content){
        super(content);

    }


    /**
     * Looking through the content of identitymap
     * returns the index of username
     * returns -1 if not found
     * @param username
     * @returns {Number}
     */
    findUser(username){

        for(let i  = 0; i< this.content.length; i++){
            if(this.content[i].Username == username){
                return i;
            }
        }
        return -1;
    }

    /**
     * Returns the instance of user found in the indentitymap
     * @param username
     * @returns {*}
     */
    getUser(username){

        return this.content[this.findUser(username)];
    }


    /**
     * Removes the user from the indentity map
     * @param username
     */
    removeUser(username){

        this.removeIndex(this.findUser(username));
    }

    /**
     * Removes and returns a user from the content list
     * @param username
     * @returns {User}
     */
    popUser(username){
        let index = this.findUser(username);
        let user = this.content[index];
        this.removeIndex(index);
        return user;
    }
};
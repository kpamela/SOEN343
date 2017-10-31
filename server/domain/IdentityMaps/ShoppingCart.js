/**
 * Created by CharlesPhilippe on 2017-10-31.
 */

const IdentityMap = require('./IdentityMap');

module.exports = class ShoppingCart extends IdentityMap{

    constructor(content){
        super(content);
    }

    /**
     *
     * @param ob1
     */
    add(ob1){
        if(this.content.length <= 7){//only 7 items in cart
            this.content.push(ob1);
        }
    }

    /**
     * Looks through the identity map and returns the index of specified item
     * returns -1 if the model was not found.
     * @param serial
     * @returns {*}
     */
    findItem(serial){
        for(let i in this.content){
            if(this.content[i].SerialNumber === serial){
                return i;
            }
        }

        return -1;//not found
    }

    /**
     * Getting the object corresponding to serial number
     * @param serial
     * @returns {ProductId}
     */
    getItem(serial){
        return this.content[this.findItem(serial)];//return the object corresponding to serial
    }

    /**
     * Looks for the index for this index of the specified item
     * and removes the object from the content of the identity map
     * @param serial
     */
    removeItem(serial){
        const index = this.findItem(serial);
        //removing model number
        this.removeIndex(index);
    }

}
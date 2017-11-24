/**
 * Created by CharlesPhilippe on 2017-10-31.
 */
var check = require('offensive'); 
const IdentityMap = require('./IdentityMap');

module.exports = class ShoppingCart extends IdentityMap{

    constructor(content) {
        super(content);
        this.timestamps = {};
    }


    /**
     *override
     * @param {ProductId} ob1
     */
    add(ob1){
        //Precondition
        check(this.content.length, 'size').is.lessThan(7); 
        var odlshoppingCart = this.content; 

        if(this.content.length < 7){//only 7 items in cart
            this.content.push(ob1);
            this.timestamps[ob1.SerialNumber] = Date.now();
            return true;
        }
        else{
            return false;
        }
        //Post Condition
        check(this.content, 'size').is.lessThan(7); 
        check(this.content.length, 'newShoppingCart').is.equalTo(oldshoppingCart.length()+1); 
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
        //Precondition 
        var oldshoppingCart = this.content; 
        const index = this.findItem(serial);
        check(index).is.not.equalTo(-1); 

        //removing model number
        this.removeIndex(index);
        delete this.timestamps[serial];

        //Post Condition
        check(this.content.length, 'newShoppingCart').is.equalTo(oldshoppingCart.length()-1); 
        const index2 = this.findItem(serial); 
        check(index2).is.equalTo(-1); 
    }

}
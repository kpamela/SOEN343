/**
 * Created by CharlesPhilippe on 2017-10-10.
 */

const delay = 5000;

export default class ProductID {

    constructor(id, timestamp, user){
        this.user = user;
        this.modelNumber = id.ModelNumber;
        this.serialNumber = id.SerialNumber;
        this.available = id.Available;

        this.timeCreated = timestamp;

        this.onTimeout = this.onTimeout.bind(this);

        //check timeout upon creation
        this.onTimeout();
        setTimeout(this.onTimeout, 5000);
    }


    onTimeout(){
        const now = Date.now();

        if(now >= this.timeCreated + delay) {
            this.user.removeFromShoppingCart(this.serialNumber, this.modelNumber);
            delete this;
        }

    }

}
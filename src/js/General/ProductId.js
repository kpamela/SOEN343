/**
 * Created by CharlesPhilippe on 2017-10-10.
 */

const delay = 60000;

export default class ProductID {

    constructor(id, timestamp, user){
        this.user = user;
        this.modelNumber = id.ModelNumber;
        this.serialNumber = id.SerialNumber;
        this.available = id.Available;
        this.price = id.Price;

        this.timeCreated = timestamp;

        this.onTimeout = this.onTimeout.bind(this);

        //check timeout upon creation
        this.onTimeout();


        setTimeout(this.onTimeout, delay - (Date.now() - this.timeCreated));
    }


    onTimeout(){
        const now = Date.now();

        if(now >= this.timeCreated + delay) {
            console.log(this);
            this.user.removeFromShoppingCart(this.serialNumber, this.modelNumber);
            alert(this.serialNumber + " was removed from your cart.");
            delete this;
        }

    }

}
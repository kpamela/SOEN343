/**
 * Created by CharlesPhilippe on 2017-10-31.
 */

class ProductId{

    constructor(id){
        this.ModelNumber = id.ModelNumber;
        this.SerialNumber = id.SerialNumber;

        this.Locked = false;
    }

}
module.exports = ProductId;
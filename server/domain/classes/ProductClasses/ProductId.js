/**
 * Created by CharlesPhilippe on 2017-10-31.
 */

class ProductId{

    constructor(modelNumber, serialNumber){
        this.ModelNumber = modelNumber;
        this.SerialNumber = serialNumber;

        this.Locked = false;
    }

}
module.exports = ProductId;
/**
 * Created by CharlesPhilippe on 2017-10-31.
 */



class ProductId{

    constructor(id, price){
        this.ModelNumber = id.ModelNumber;
        this.SerialNumber = id.SerialNumber;

        this.Available = id.Available;
        this.Price = price;

    }


}
module.exports = ProductId;
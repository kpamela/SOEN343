/**
 * Created by CharlesPhilippe on 2017-10-10.
 */

export default class ProductDescription{

    constructor(){
        this.category = "";
        this.description = "";
        this.amount = 0;
    }

    setCategory(category){
        this.category = category;
    }

    setDescription(desc){
        this.description = desc;
    }

}
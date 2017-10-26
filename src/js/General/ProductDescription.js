/**
 * Created by CharlesPhilippe on 2017-10-10.
 */

export default class ProductDescription{

    constructor(option){
        this.category = "";
        this.description = [];

        this.amount = 0;

        if (isNaN(parseInt(option))) {
            this.convertFromDomainObject(option);
        }
        else {
            this.amount = parseInt(option);
        }

    }

    convertFromDomainObject(ob1){
        this.category = ob1.category;
        this.amount = ob1.amount;
        for(let i in ob1){
            if(i !== 'category' && i !== 'amount' && i !== 'productIds'){
                this.description[i] = ob1[i];
            }
        }
    }

    setCategory(category){
        this.category = category;
    }

    setDescription(desc){
        this.description = desc;
    }

}
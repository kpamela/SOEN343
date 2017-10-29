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
        this.category = ob1.Category;
        this.amount = ob1.Amount;
        for(let i in ob1){
            if(i !== 'Category' && i !== 'Amount' && i !== 'productIds'){
                let ind = i;
                if(i !== 'RAMSize'){//ignore RAMSize
                    ind = i.charAt(0).toLowerCase() + i.slice(1);
                }
                this.description[ind] = ob1[i];
            }
        }
        console.log(this);
    }

    setCategory(category){
        this.category = category;
    }

    setDescription(desc){
        this.description = desc;
    }

}
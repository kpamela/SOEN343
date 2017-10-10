/**
 * Created by CharlesPhilippe on 2017-10-10.
 */
import ProductDescription from './ProductDescriptionTest.js'

export class Television extends ProductDescription{

    constructor(amount){
        super();
        this.amount = amount;

        this.setCategory("Television");
    }

}

export class Monitor extends ProductDescription{

    constructor(amount){
        super();
        this.amount = amount;

        this.setCategory("Monitor");
    }

}

export class Tablet extends ProductDescription{

    constructor(amount){
        super();
        this.amount = amount;

        this.setCategory("Tablet");
    }

}

export class Laptop extends ProductDescription{

    constructor(amount){
        super();
        this.amount = amount;

        this.setCategory("Laptop");
    }

}
export class Desktop extends ProductDescription{

    constructor(amount){
        super();
        this.amount = amount;

        this.setCategory("Desktop");
    }

}
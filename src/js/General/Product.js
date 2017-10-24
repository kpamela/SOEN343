/**
 * Created by CharlesPhilippe on 2017-10-10.
 */
import ProductDescription from './ProductDescription.js'


export class Monitor extends ProductDescription{

    constructor(option){
        super(option);
        this.setCategory("Monitor");
    }

}

export class Tablet extends ProductDescription{

    constructor(option){
        super(option);
        this.setCategory("TabletComputer");
    }

}

export class Laptop extends ProductDescription{

    constructor(option){
        super(option);
        this.setCategory("LaptopComputer");
    }

}
export class Desktop extends ProductDescription{

    constructor(option){
        super(option);
        this.setCategory("DesktopComputer");
    }

}
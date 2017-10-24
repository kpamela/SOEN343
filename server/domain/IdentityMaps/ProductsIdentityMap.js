/**
 * Created by CharlesPhilippe on 2017-10-23.
 */
const IdentityMap = require('./IdentityMap');

module.exports = class ProductsIdentityMap extends IdentityMap{

    constructor(content){
        super(content);

    }


    /**
     * Looks through the identity map and returns the index of specified model
     * returns -1 if the model was not found.
     * @param model
     * @returns {*}
     */
    findModel(model){
        for(let i in this.content){
            if(this.content[i].modelNumber === model){
                return i;
            }
        }

        return -1;//not found
    }

    /**
     * Getting the object corresponding to model number
     * @param model
     * @returns {*}
     */
    getModel(model){
        return this.content[this.findModel(model)];//return the object corresponding to model
    }
    //TODO find other things

    /**
     * Looks for the index for this index of the specified model
     * and removes the object from the content of the identity map
     * @param model
     */
    removeModel(model){
        const index = this.findModel(model);
        //removing model number
        this.removeIndex(index);
    }


};
/**
 * Created by CharlesPhilippe on 2017-10-23.
 */
const IdentityMap = require('./IdentityMap');

module.exports = class ProductsIdentityMap extends IdentityMap{

    constructor(content){
        super(content);

        this.deletedItems = {};
    }

    addDeletedProduct(modelNumber){
        this.deletedItems[modelNumber] = 1;
    }

    restoreDeletedProduct(modelNumber){
        delete this.deletedItems[modelNumber];
    }


    /**
     * Looks through the identity map and returns the index of specified model
     * returns -1 if the model was not found.
     * @param model
     * @returns {*}
     */
    findModel(model){
        for(let i in this.content){
            if(this.content[i].ModelNumber === model){
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

    /**
     * Looks, removes, and returns the specified model
     * @param model
     * @returns {*}
     */
    popModel(model){
        let index = this.findModel(model);
        let item = this.content[index]
        this.removeIndex(index);
        return item;
    }


};
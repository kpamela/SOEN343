/**
 * Created by CharlesPhilippe on 2017-10-25.
 */


module.exports =  class ProductHistory{
    
    constructor(){
        this.new = [];
        this.modified =[];
        this.deleted=[];
    }


    /**
     * Returns the delted object
     * @param model
     * @returns {*}
     */
     getDeletedModel(model){
        for(let i in this.deleted) {
            if (this.deleted[i].ModelNumber === model) {
                return this.deleted[i];//found
            }
        }
        return null;//item not found
    }

    /**
     * Returns the instance of the old object
     * @param model
     * @returns {string|*}
     */
     getOldModel(model){
         const i = this.getCurrentModelIndexInHistory(model);
        return this.modified[i].old;
    }

    /**
     * Returns the index of the current model in the modified list
     *
     * @param model
     * @returns {*}
     */
     getCurrentModelIndexInHistory(model){
        for(let i in this.modified) {
            if (this.modified[i].current === model) {
                return i;//found
            }
        }
        return -1;//item not found
    }

    resetHistory(){
         this.new = [];
        this.modified =[];
        this.deleted=[];
    }

};
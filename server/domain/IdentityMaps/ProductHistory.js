/**
 * Created by CharlesPhilippe on 2017-10-25.
 */


module.exports =  class ProductHistory{
    
    constructor(){
        this.modified =[];
        this.deleted=[];
    }


     getDeletedModel(model){
        for(let i in this.deleted) {
            if (this.deleted[i].ModelNumber === model) {
                return this.deleted[i];//found
            }
        }
        return null;//item not found
    }

     getOldModel(model){
         const i = this.getCurrentModelIndexInHistory(model);
        return this.modified[i].old;
    }

     getCurrentModelIndexInHistory(model){
        for(let i in this.modified) {
            if (this.modified[i].current === model) {
                return i;//found
            }
        }
        return -1;//item not found
    }

    resetHistory(){
        this.modified =[];
        this.deleted=[];
    }

};
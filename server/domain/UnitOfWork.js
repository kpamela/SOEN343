/**
 * Created by CharlesPhilippe on 2017-10-23.
 */

module.exports = class UnitOfWork{

//TODO add currently committing, to prevent writing at the same time
    constructor(){
        this.changeList = {newList:[], dirtyList:[], deletedList:[]};
    }

    registerNew(ob1){
        ob1.setNew();
        this.removeFromChangeList(ob1);
        this.changeList.newList.push(ob1.modelNumber);
    }

    registerDirty(ob1){
        ob1.setDirty();
        this.removeFromChangeList(ob1);
        this.changeList.dirtyList.push(ob1.modelNumber);
    }

    registerClean(ob1){
        ob1.setClean();
        this.removeFromChangeList(ob1);//clean means no list
    }

    registerDeleted(ob1){
        ob1.setDeleted();
        this.removeFromChangeList(ob1);//removing from any other list before pushing to new one
        this.changeList.dirtyList.push(ob1.modelNumber);
    }


    removeFromChangeList(ob1){

        //removing model number from list
        //there should be only one model number instance in all the changeList
        for(let i in this.changeList.newList){
            if(this.changeList.newList[i] === ob1.modelNumber){
                this.changeList.newList.splice(1,1);
                return;
            }
        }
        for(let i in this.changeList.dirtyList){
            if(this.changeList.dirtyList[i] === ob1.modelNumber){
                this.changeList.dirtyList.splice(1,1);
                return;
            }
        }
        for(let i in this.changeList.deletedList){
            if(this.changeList.deletedList[i] === ob1.modelNumber){
                this.changeList.deletedList.splice(1,1);
                return;
            }
        }

    }


    commit(){

        return this.changeList;
    }


    //TODO unsure how to implement this
    rollback(){

    }

};

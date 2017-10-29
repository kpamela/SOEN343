/**
 * Created by CharlesPhilippe on 2017-10-23.
 */

module.exports = class UnitOfWork{

//TODO add currently committing, to prevent writing at the same time
    constructor(){
        this.changeList = {newList:[], dirtyList:[], deletedList:[]};
        this.hasUncommittedChanges = false;
    }

    registerNew(ob1){
        ob1.setNew();
        this.removeFromChangeList(ob1);
        this.changeList.newList.push(ob1.ModelNumber);
        this.hasUncommittedChanges = true;
    }

    registerDirty(ob1){
        ob1.setDirty();
        this.removeFromChangeList(ob1);
        this.changeList.dirtyList.push(ob1.ModelNumber);
        this.hasUncommittedChanges = true;
    }

    registerClean(ob1){
        ob1.setClean();
        this.removeFromChangeList(ob1);//clean means no list
        this.lookForUncommittedChanges();
    }

    registerDeleted(ob1){
        ob1.setDeleted();
        this.removeFromChangeList(ob1);//removing from any other list before pushing to new one
        this.changeList.deletedList.push(ob1.ModelNumber);
        this.hasUncommittedChanges = true;
    }


    removeFromChangeList(ob1){

        //removing model number from list
        //there should be only one model number instance in all the changeList
        for(let i  in this.changeList.newList){
            if(this.changeList.newList[i] === ob1.ModelNumber){
                this.changeList.newList.splice(i,1);
                return;
            }
        }
        for(let i in this.changeList.dirtyList){
            if(this.changeList.dirtyList[i] === ob1.ModelNumber){
                this.changeList.dirtyList.splice(i,1);
                return;
            }
        }
        for(let i in this.changeList.deletedList){
            if(this.changeList.deletedList[i] === ob1.ModelNumber){
                this.changeList.deletedList.splice(i,1);
                return;
            }
        }

    }


    lookForUncommittedChanges(){
        if(this.changeList.newList.length === 0
        && this.changeList.dirtyList.length === 0
        && this.changeList.deletedList.length === 0 ){
            this.hasUncommittedChanges = false;
        }
        else{
            this.hasUncommittedChanges = true;
        }
    }


    commit(){
        //cleaning handled by register clean
        console.log(this.changeList);
        return this.changeList;
    }



    rollback(){
        const changeList = this.changeList;
        //cleaning not handled by revert function in mapper
        this.changeList = {newList:[], dirtyList:[], deletedList:[]};
        this.hasUncommittedChanges = false;
        //similar to commit
        return changeList;
    }

};

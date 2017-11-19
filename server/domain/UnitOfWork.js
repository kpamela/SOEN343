/**
 * Created by CharlesPhilippe on 2017-10-23.
 */


module.exports = class UnitOfWork{



    constructor(){
        this.changeList = {newList:[], dirtyList:[], deletedList:[]};
        this.hasUncommittedChanges = false;
    }

    /**
     * Registers specified object as a new product
     * @param {ProductDescription} ob1
     */
    registerNew(ob1){
        ob1.setNew();
        //make sure that it is not part of any other change list
        this.removeFromChangeList(ob1);
        //stores only model number
        this.changeList.newList.push(ob1.ModelNumber);
        this.hasUncommittedChanges = true;
    }

    /**
     * Registers specified product to dirty
     * @param {ProductDescription} ob1
     */
    registerDirty(ob1){
        ob1.setDirty();
        //make sure that it is not part of any other change list
        this.removeFromChangeList(ob1);
        this.changeList.dirtyList.push(ob1.ModelNumber);
        this.hasUncommittedChanges = true;
    }

    /**
     * Registers specified product as a clean product, essentially removing it from any change list
     * @param {ProductDescription} ob1
     */
    registerClean(ob1){
        ob1.setClean();
        this.removeFromChangeList(ob1);//clean means no list
        this.lookForUncommittedChanges();
    }

    /**
     * Registers specified product as deleted
     * @param ob1
     */
    registerDeleted(ob1){
        ob1.setDeleted();
        this.removeFromChangeList(ob1);//removing from any other list before pushing to new one
        this.changeList.deletedList.push(ob1.ModelNumber);
        this.hasUncommittedChanges = true;
    }


    /**
     * Removes specified product form any change list it might be in
     * Technically should be in only one
     * so stop after finding one instance
     * @param ob1
     */
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


    /**
     * Checks if any changes has occurred
     * Setted for Uncommitted change variable
     */
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


    /**
     * Returns the changes lists.
     * Reset should be handled in method calling it
     * by setting all objects to clean
     *
     * @returns {{newList: Array, dirtyList: Array, deletedList: Array}|*}
     */
    commit(){
        //cleaning handled by register clean
        console.log(this.changeList);
        return this.changeList;
    }


    /**
     * Returns list of all changes, resets the change lists
     * @returns {{newList: Array, dirtyList: Array, deletedList: Array}|*}
     */
    rollback(){
        const changeList = this.changeList;
        //cleaning not handled by revert function in mapper
        this.changeList = {newList:[], dirtyList:[], deletedList:[]};
        this.hasUncommittedChanges = false;
        //similar to commit
        return changeList;
    }

};

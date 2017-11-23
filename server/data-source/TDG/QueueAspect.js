/**
 * Created by CharlesPhilippe on 2017-11-18.
 */
const handler = require('./handler.js');
const meld = require('meld');
const jquery = require('jquery-deferred');
let writingQueue = [];
let writing = false;

//TODO READERS


/**
 * Queues write demands
 */
let writer = meld.around(handler, 'handleWrite', function(){
    let joinpoint = meld.joinpoint();
    let sql = joinpoint.args[0];
    let data = joinpoint.args[1];
    //used as temporary data holding when proceeding to TDG call
    let temp = new jquery.Deferred();
    //Triggered when is at index 0 of queue
    let myTurn = new jquery.Deferred();

    /**
     * First in queue
     */
    myTurn.then(function(){
        //Returned data from TDG call
        temp.then(function(res){
            data.resolve(res);// resolve original demand

            //Remove this writer from queue
            writingQueue.splice(0, 1);
            console.log(writingQueue.length,' in Queue');

            //if writers are waiting, continue through the queue
            if(writingQueue.length > 0){
                writingQueue[0].resolve();
            }
        });

        //proceed with temporary data
        joinpoint.proceed(sql, temp);

    });

    //add to waitlist
    writingQueue.push(myTurn);

    if(writingQueue.length === 1){//the first one in queue
        myTurn.resolve();
    }

});

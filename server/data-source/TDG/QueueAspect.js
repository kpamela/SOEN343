/**
 * Created by CharlesPhilippe on 2017-11-18.
 */
const handler = require('./handler.js');
const meld = require('meld');
const jquery = require('jquery-deferred');
let writingQueue = [];
let writing = false;


let writer = meld.around(handler, 'handleWrite', function(){
    let joinpoint = meld.joinpoint();
    let sql = joinpoint.args[0];
    let data = joinpoint.args[1];
    let temp = new jquery.Deferred();
    let myTurn = new jquery.Deferred();

    myTurn.then(function(){
        temp.then(function(res){
            data.resolve(res);
            writingQueue.splice(0, 1);
            console.log(writingQueue.length,' in Queue');
            if(writingQueue.length > 0){
                writingQueue[0].resolve();
            }
        });

        joinpoint.proceed(sql, temp);

    });

    writingQueue.push(myTurn);

    if(writingQueue.length === 1){//the first one in queue
        myTurn.resolve();
    }

});

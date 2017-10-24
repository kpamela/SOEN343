/*
 Created by kpamela on 2017-10-20.
*/
const mysql = require('mysql');

module.exports = {
    handleRead: function (input, connection) {
        connection.query(sql, input, (err, result) => {
            if (err) {
                console.log(err);
                return err;
            }
            else {
                console.log("Successful read");
                return result;
            }
        });
    },

    handleWrite: function (input, connection) {
        connection.query(sql, input, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Successful write to database");
                return input;
            }
        });
    }
}

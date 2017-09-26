const mysql = require('mysql');

var dbConfig = {
    host: 'us-cdbr-iron-east-05',
    user: 'b2486b8bd3fd87',
    password: 'c2424e78',
    database: 'heroku_f09d70d39831307'
}

// Create MySQL connection pool
var pool = mysql.createPool(dbConfig);

// Connect to the db
pool.getConnection((err, result) => {
    if(err) throw err;
    console.log('MySQL connected');
    let sql = 'CREATE DATABASE IF NOT EXISTS tecmarket';
    pool.query(sql, (err, result) => {
        if(err) throw err;
        console.log('Database tecmarket created');
    });
});

module.exports = pool;
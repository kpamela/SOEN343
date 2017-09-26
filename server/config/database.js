const mysql = require('mysql');

var dbConfig = {
    connectTimeout: 10000,
    host: 'localhost',
    user: 'root',
    database: 'tecmarket'
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
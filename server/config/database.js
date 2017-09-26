const mysql = require('mysql');

var dbConfig = {
    host: '35.196.50.143',
    user: 'root',
    port: '3306',
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


// Table structure for table 'Catalogue' 
let sql = `CREATE TABLE IF NOT EXISTS  Catalogue(
	SerialNumber int(9) NOT NULL, 
    Available boolean, 
    PRIMARY KEY (SerialNumber, Available)
)`

module.exports = sql

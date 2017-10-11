

// Table structure for table 'Products' 
let sql = `CREATE TABLE IF NOT EXISTS Products(
	SerialNumber int(9) NOT NULL, 
	ModelNumber int(9) NOT NULL, 
    Available boolean, 
    PRIMARY KEY (SerialNumber, ModelNumber)
)`

module.exports = sql

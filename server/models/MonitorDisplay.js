

// Table structure for table 'MonitorDisplay' 
let sql = `CREATE TABLE IF NOT EXISTS MonitorDisplay(
	SerialNumber int(9) NOT NULL, 
    ModelNumber varchar(10) NOT NULL, 
    Size double NOT NULL, 
    Weight double NOT NULL, 
    BrandName varchar(20) NOT NULL, 
    Price double(10,2) NOT NULL, 
	Available boolean, 
    PRIMARY KEY (SerialNumber), 
    FOREIGN KEY (SerialNumber, Available) REFERENCES Catalogue (SerialNumber, Available) ON UPDATE CASCADE
)`

module.exports = sql

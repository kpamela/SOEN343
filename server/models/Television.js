

// Table structure for table 'Television' 
let sql = `CREATE TABLE IF NOT EXISTS Television(
	SerialNumber int(9) NOT NULL, 
    ModelNumber varchar(10) NOT NULL, 
    Dimensions double NOT NULL, 
    Weight double NOT NULL, 
    BrandName varchar(20) NOT NULL, 
    TelevisionType varchar(5) NOT NULL, -- liste déroulante quand le Admin va ajouter du UI -- 
    Price double(10,2) NOT NULL,
	Available boolean, 
    PRIMARY KEY (SerialNumber), 
	FOREIGN KEY (SerialNumber, Available) REFERENCES Catalogue (SerialNumber, Available) ON UPDATE CASCADE
)`

module.exports = sql

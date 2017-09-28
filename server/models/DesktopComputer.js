

// Table structure for table 'DesktopComputer' 
let sql = `CREATE TABLE IF NOT EXISTS DesktopComputer(
	SerialNumber int(9) NOT NULL, 
    ModelNumber varchar(10) NOT NULL, 
    Dimensions double NOT NULL, 
    ProcessorType varchar(20) NOT NULL, 
    RAMSize long NOT NULL, 
    Weight double NOT NULL, 
    NumberCPUCores int(5) NOT NULL, 
    HardDriveSize long NOT NULL, 
    BrandName varchar(20) NOT NULL, 
    Price double(10,2) NOT NULL, 
	Available boolean, 
    ProductName varchar(45) NOT NULL, 
    PRIMARY KEY (SerialNumber),
    FOREIGN KEY (SerialNumber, Available) REFERENCES Catalogue (SerialNumber, Available) ON UPDATE CASCADE
)`

module.exports = sql

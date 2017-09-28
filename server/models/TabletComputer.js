

// Table structure for table 'TabletComputer' 
let sql = `CREATE TABLE IF NOT EXISTS TabletComputer(
	SerialNumber int(9) NOT NULL, 
    ModelNumber varchar(10) NOT NULL, 
    DisplaySize double NOT NULL, 
    DetailedDimensions double NOT NULL, 
    ProcessorType varchar(20) NOT NULL, 
    RAMSize long NOT NULL, 
    Weight double NOT NULL, 
    NumberCPUCores int(5) NOT NULL, 
    HardDriveSize long NOT NULL, 
    Battery varchar(20) NOT NULL, 
    BrandName varchar(20) NOT NULL, 
    BuiltInOPerationSystem varchar(20) NOT NULL, 
    Price double(10,2) NOT NULL, 
    Camera boolean, 
    Available boolean, 
    PRIMARY KEY (SerialNumber), 
    FOREIGN KEY (SerialNumber, Available) REFERENCES Catalogue (SerialNumber, Available) ON UPDATE CASCADE
)`

module.exports = sql

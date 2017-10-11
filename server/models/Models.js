

// Table structure for table 'Models' 
let sql = `CREATE TABLE IF NOT EXISTS Models(
	ModelNumber varchar(10) NOT NULL, 
    ProcessorType varchar(20), 
    RAMSize long, 
    NumberOfCores int(5), 
    HardDriveSize long, 
    TelevisionType varchar(5),
    Size double, 
    DisplaySize double,
    HadCamera boolean, 
    HadTouchScreen boolean, 
    OperatingSystem varchar(20),
    BatteryInfo varchar(20),
    Dimensions double NOT NULL, 
    Weight double NOT NULL, 
    BrandName varchar(20) NOT NULL, 
    Price double(10,2) NOT NULL,
    ProductName varchar(45) NOT NULL, 

    PRIMARY KEY (ModelNumber)
)`

module.exports = sql

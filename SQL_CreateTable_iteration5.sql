USE heroku_f09d70d39831307; 

-- Table structure for table 'Users' -- 
CREATE TABLE IF NOT EXISTS Users( 
    Username varchar(10) NOT NULL, 
    UserPassword varchar(10) NOT NULL,
    FirstName varchar(20) NOT NULL, 
    LastName varchar(20) NOT NULL, 
    AddressID int(5) NOT NULL, 
    EmailAdress varchar(30) NOT NULL, 
    PhoneNumber long NOT NULL, 
    Administrator tinyint(1) NOT NULL DEFAULT '0', 
    Apt varchar(5) DEFAULT NULL,
    StreetNumber int(6) NOT NULL,
    Street varchar(30) NOT NULL,
    City varchar(30) NOT NULL,
    ZIP varchar(6) NOT NULL,
    Country varchar(30) NOT NULL,
    IsDeleted tinyint(1) NOT NULL DEFAULT '0',
	
    PRIMARY KEY (Username), 
); 

-- Table structure for table 'Television' -- 
CREATE TABLE IF NOT EXISTS Models(
    ModelNumber varchar(10) NOT NULL, 
    ProcessorType varchar(20), 
    RAMSize long, 
    NumberOfCores int(5), 
    HardDriveSize long, 
    TelevisionType varchar(5),
    Size double, 
    DisplaySize double,
    HasCamera tinyint(1), 
    CameraInfo varchar(30), 
    HasTouchScreen tinyint(1), 
    OperatingSystem varchar(20),
    BatteryInfo varchar(20),
    Dimensions double NOT NULL, 
    Weight double NOT NULL, 
    BrandName varchar(20) NOT NULL, 
    Price double(10,2) NOT NULL,
    ProductName varchar(45) NOT NULL, 
    Category varchar(30) NOT NULL,
    Amount int(5) NOT NULL,
    IsDeleted tinyint(1) NOT NULL DEFAULT '0', 
	
    PRIMARY KEY (ModelNumber)
);

-- Table structure for table 'Products' -- 
CREATE TABLE IF NOT EXISTS Products(
    SerialNumber int(9) NOT NULL, 
    ModelNumber varchar(10) NOT NULL, 
    Available tinyint(1), 
	
    PRIMARY KEY (SerialNumber, ModelNumber), 
    FOREIGN KEY (ModelNumber) REFERENCES models (ModelNumber) ON UPDATE CASCADE
); 

-- Table structure for table 'PurchaseHistory' -- 
CREATE TABLE PurchaseHistory2( 
    SerialNumber int(9) NOT NULL, 
    ModelNumber varchar(10) NOT NULL, 
    Username varchar(10) NOT NULL, 
    PurchaseTimeStamp double,
    IsReturned tinyint(1) DEFAULT '0',
	
    PRIMARY KEY (Username, SerialNumber), 
    FOREIGN KEY (Username) REFERENCES Users (Username)
); 
    
    

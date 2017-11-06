USE heroku_f09d70d39831307; 

-- Table structure for table 'Address' -- 
CREATE TABLE IF NOT EXISTS Address(
  AddressID int(5) NOT NULL,
  Apt varchar(5) DEFAULT NULL,
  StreetNumber int(6) NOT NULL,
  Street varchar(30) NOT NULL,
  City varchar(30) NOT NULL,
  ZIP varchar(6) NOT NULL,
  Cojuntry varchar(30) NOT NULL,
  
  PRIMARY KEY (AddressID)
); 

-- Table structure for table 'Users' -- 
CREATE TABLE IF NOT EXISTS Users( 
	UserID int(9) NOT NULL, 
	Username varchar(10) NOT NULL, 
    UserPassword varchar(10) NOT NULL,
    FirstName varchar(20) NOT NULL, 
    LastName varchar(20) NOT NULL, 
    AddressID int(5) NOT NULL, 
    EmailAdress varchar(30) NOT NULL, 
    PhoneNumber long NOT NULL, 
    Administrator boolean NOT NULL, 
    PRIMARY KEY (UserID), 
    FOREIGN KEY (AddressID) REFERENCES Address (AddressID) ON DELETE CASCADE ON UPDATE CASCADE 
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
    HadCamera boolean, 
    CameraInfo varchar(30), 
    HadTouchScreen boolean, 
	OperatingSystem varchar(20),
    BatteryInfo varchar(20),
    Dimensions double NOT NULL, 
    Weight double NOT NULL, 
    BrandName varchar(20) NOT NULL, 
    Price double(10,2) NOT NULL,
	ProductName varchar(45) NOT NULL, 
    PRIMARY KEY (ModelNumber)
);

-- Table structure for table 'Catalogue' -- 
CREATE TABLE IF NOT EXISTS Products(
	SerialNumber int(9) NOT NULL, 
    ModelNumber varchar(10) NOT NULL, 
    Available boolean, 
    PRIMARY KEY (SerialNumber, ModelNumber), 
    FOREIGN KEY (ModelNumber) REFERENCES models (ModelNumber) ON UPDATE CASCADE
); 

-- Table structure for table 'ActiveUsersRegistry' -- 
CREATE TABLE ActiveUsersRegistry(
	UserID int(9) NOT NULL, 
    LoginTimestamp timestamp, 
    IsActive boolean, 
    PRIMARY KEY (UserID), 
    FOREIGN KEY (UserID) REFERENCES Users (UserID) ON UPDATE CASCADE
); 

-- Table structure for table 'PurchaseHistory' -- 
CREATE TABLE PurchaseHistory( 
	SerialNumber int(9) NOT NULL, 
    ModelNumber varchar(10) NOT NULL, 
    UserID int(9) NOT NULL, 
    PurchaseTimeStamp timestamp,
    PRIMARY KEY (UserID, ModelNumber, SerialNumber), 
    FOREIGN KEY (UserID) REFERENCES Users (UserID) ON UPDATE CASCADE, 
	FOREIGN KEY (ModelNumber) REFERENCES models (ModelNumber) ON UPDATE CASCADE
); 
    
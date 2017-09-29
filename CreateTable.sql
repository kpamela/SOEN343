
-- Table structure for table 'Address' -- 
CREATE TABLE IF NOT EXISTS Address(
  AddressID int(5) NOT NULL,
  Apt varchar(5) DEFAULT NULL,
  StreetNumber int(6) NOT NULL,
  Street varchar(30) NOT NULL,
  City varchar(30) NOT NULL,
  ZIP varchar(6) NOT NULL,
  Country varchar(30) NOT NULL,
  
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

-- Table structure for table 'Catalogue' -- 
CREATE TABLE IF NOT EXISTS Catalogue(
	SerialNumber int(9) NOT NULL, 
    Available boolean, 
    PRIMARY KEY (SerialNumber, Available)
); 

-- Table structure for table 'Television' -- 
CREATE TABLE IF NOT EXISTS Television(
	SerialNumber int(9) NOT NULL, 
    ModelNumber int(10) NOT NULL, 
    Dimensions double NOT NULL, 
    Weight double NOT NULL, 
    BrandName varchar(20) NOT NULL, 
    TelevisionType varchar(5) NOT NULL, -- liste déroulante quand le Admin va ajouter du UI -- 
    Price double(10,2) NOT NULL,
	Available boolean, 
	ProductName varchar(45) NOT NULL, 
    PRIMARY KEY (SerialNumber), 
	FOREIGN KEY (SerialNumber, Available) REFERENCES Catalogue (SerialNumber, Available) ON UPDATE CASCADE
);

-- Table structure for table 'DesktopComputer' -- 
CREATE TABLE IF NOT EXISTS DesktopComputer(
	SerialNumber int(9) NOT NULL, 
    ModelNumber int(10) NOT NULL, 
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
);

-- Table structure for table 'MonitorDisplay' -- 
CREATE TABLE IF NOT EXISTS MonitorDisplay(
	SerialNumber int(9) NOT NULL, 
    ModelNumber int(10) NOT NULL, 
    Size double NOT NULL, 
    Weight double NOT NULL, 
    BrandName varchar(20) NOT NULL, 
    Price double(10,2) NOT NULL, 
	Available boolean,
	ProductName varchar(45) NOT NULL, 
    PRIMARY KEY (SerialNumber), 
    FOREIGN KEY (SerialNumber, Available) REFERENCES Catalogue (SerialNumber, Available) ON UPDATE CASCADE
); 

-- Table structure for table 'Laptop' -- 
CREATE TABLE IF NOT EXISTS Laptop(
	SerialNumber int(9) NOT NULL, 
    ModelNumber int(10) NOT NULL, 
    DisplaySize double NOT NULL, 
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
    TouchScreen boolean, 
    Available boolean,
    ProductName varchar(45) NOT NULL, 
    PRIMARY KEY (SerialNumber), 
    FOREIGN KEY (SerialNumber, Available) REFERENCES Catalogue (SerialNumber, Available) ON UPDATE CASCADE
); 

-- Table structure for table 'TabletComputer' -- 
CREATE TABLE IF NOT EXISTS TabletComputer(
	SerialNumber int(9) NOT NULL, 
    ModelNumber int(10) NOT NULL, 
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
    ProductName varchar(45) NOT NULL, 
    PRIMARY KEY (SerialNumber), 
    FOREIGN KEY (SerialNumber, Available) REFERENCES Catalogue (SerialNumber, Available) ON UPDATE CASCADE
); 


-- Table structure for table 'CompletedPurchases' -- 
CREATE TABLE IF NOT EXISTS CompletedPurchases(
	UserID int(9) NOT NULL, 
    SerialNumber int(9) NOT NULL, 
    IsReturned boolean, 
    PurchaseTimeStamp timestamp,
    PRIMARY KEY (UserID, SerialNumber),
	FOREIGN KEY (UserID) REFERENCES Users (UserID) ON UPDATE CASCADE,
    FOREIGN KEY (SerialNumber) REFERENCES Catalogue (SerialNumber) ON UPDATE CASCADE
); 

-- Table structure for table 'Monitoring' -- 
CREATE TABLE IF NOT EXISTS Monitoring(
	UserID int(9) NOT NULL, 
    LoginTimestamp timestamp, 
    IsActive boolean, 
    PRIMARY KEY (UserID), 
    FOREIGN KEY (UserID) REFERENCES Users (UserID) ON UPDATE CASCADE
); 

-- Table structure for table 'ShoppingCartHoldings' -- 
CREATE TABLE IF NOT EXISTS ShoppingCartHoldings(
	UserID int(9) NOT NULL, 
    SerialNumber int(9) NOT NULL, 
    HoldingTimestamp timestamp, 
    PRIMARY KEY (UserID), 
	FOREIGN KEY (UserID) REFERENCES Users (UserID) ON UPDATE CASCADE, 
    FOREIGN KEY (SerialNumber) REFERENCES Catalogue (SerialNumber) ON UPDATE CASCADE
); 

    
    
    
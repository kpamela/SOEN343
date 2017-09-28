

// Table structure for table 'CompletedPurchases' 
let sql = `CREATE TABLE IF NOT EXISTS CompletedPurchases(
	UserID int(9) NOT NULL, 
    SerialNumber int(9) NOT NULL, 
    IsReturned boolean, 
    PurchaseTimeStamp timestamp,
    PRIMARY KEY (UserID, SerialNumber),
	FOREIGN KEY (UserID) REFERENCES Users (UserID) ON UPDATE CASCADE,
    FOREIGN KEY (SerialNumber) REFERENCES Catalogue (SerialNumber) ON UPDATE CASCADE
)`

module.exports = sql

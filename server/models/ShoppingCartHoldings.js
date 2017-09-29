
// Table structure for table 'ShoppingCartHoldings' 
let sql = `CREATE TABLE IF NOT EXISTS ShoppingCartHoldings(
	UserID int(9) NOT NULL, 
    SerialNumber int(9) NOT NULL, 
    HoldingTimestamp timestamp, 
    PRIMARY KEY (UserID), 
	FOREIGN KEY (UserID) REFERENCES Users (UserID) ON UPDATE CASCADE, 
    FOREIGN KEY (SerialNumber) REFERENCES Catalogue (SerialNumber) ON UPDATE CASCADE
)`

module.exports = sql

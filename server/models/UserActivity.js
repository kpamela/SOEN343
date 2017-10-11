

// Table structure for table 'UserActivity' 
let sql = `CREATE TABLE IF NOT EXISTS UserActivity(
	UserID int(9) NOT NULL, 
    LoginTimestamp timestamp, 
    IsActive boolean, 
    PRIMARY KEY (UserID), 
    FOREIGN KEY (UserID) REFERENCES Users (UserID) ON UPDATE CASCADE
)`

module.exports = sql


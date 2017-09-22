// User table goes here
let sql = `CREATE TABLE IF NOT EXISTS users (
    UserID int(9) NOT NULL AUTO_INCREMENT,
    Username varchar(10) NOT NULL,
    Password varchar(10) NOT NULL,
    FirstName varchar(20) NOT NULL,
    LastName varchar(20) NOT NULL,
    AddressID int(5) NOT NULL,
    EmailAddress varchar(30) NOT NULL,
    PhoneNumber long NOT NULL,
    Administrator boolean NOT NULL,
    PRIMARY KEY (UserID) 
)`
// Add this line later
//FOREIGN KEY (AddressID) REFERENCES Address (AddressID) ON DELETE CASCADE ON UPDATE CASCADE;
module.exports = sql
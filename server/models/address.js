
// Table structure for table 'Address' 
let sql = `CREATE TABLE IF NOT EXISTS Address(
  AddressID int(5) NOT NULL,
  Apt varchar(5) DEFAULT NULL,
  StreetNumber int(6) NOT NULL,
  Street varchar(30) NOT NULL,
  City varchar(30) NOT NULL,
  ZIP varchar(6) NOT NULL,
  Country varchar(30) NOT NULL,

  PRIMARY KEY (AddressID)
)`

module.exports = sql








var mysql = require('mysql');

var con = mysql.createConnection({
  host: "52.15.226.85",
  user: "philip",
  password: "blockchain",
  database: "blockchaindb"
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO users (user_id,name, surname, email, dateOfBirth, password, cellphone, username) VALUES (1,'test', 'testSurname', 'test@test.com','1992-09-21','test','1231231231','test')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});

/*con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO user_address (adress_id, Country, City, `Address Line 1`, PostalCode) VALUES (1, 'South Africa','Potchefstroom','47 Van Rooy Street','2531')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});*/

/*con.connect(function(err) {
  if (err) throw err;
  var sql = "DROP TABLE users, user_address";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table deleted");
  });
});*/

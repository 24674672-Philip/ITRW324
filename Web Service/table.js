var mysql = require('mysql');

var con = mysql.createConnection({
  host: "52.15.226.85",
  user: "philip",
  password: "blockchain",
  database: "blockchainDB"
});


con.connect(function(err) {
  if (err) throw err;
  var sql = "DROP TABLE users";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table deleted");
  });
});

var http = require('http');
var mysql = require('mysql');
var url = require('url');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

http.createServer(function (req, res) {
  var q = url.parse(req.url,true);
  if(q.type === 'login'){
	var sql = 'SELECT * FROM users WHERE user_name = ? AND user_pass = ?';
	con.connect(function(err) {
	  if (err) throw err;
	  con.query(sql, [q.user, q.pass], function (err, result) {
	    if (err) throw err;
	    console.log(result);
	  });	
	});  
  }
  else if(q.type === 'register'){
	var sql = 'INSERT INTO users (?) VALUES ?';
	var val = ;
	con.connect(function(err) {
	  if (err) throw err;
	  con.query(sql, [val], function (err, result) {
	    if (err) throw err;
	    console.log(result);
	  });	
	});      
  }	  
}).listen(8080);
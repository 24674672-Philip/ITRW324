var http = require('http');
var mysql = require('mysql');
var url = require('url');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mydb"
});

/* con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
}); */

http.createServer(function (req, res) {
  var q = url.parse(req.url,true).query;
  res.writeHead(200, {'Content-Type': 'text/plain'});
  if(q.type === 'login'){
	var sql = 'SELECT * FROM users WHERE user_name = ? AND user_password = ?';
	con.connect(function(err) {
	  if (err) throw err;
	  con.query(sql, [q.user, q.pass], function (err, result) {
	    if (err) throw err;
	    console.log(result);
      res.end('Success');
	  });
	});
  }
  else if(q.type === 'register'){
	var sql = 'INSERT INTO users (user_name, user_surname, user_password) VALUES ?';
  var valIn = [[q.user, q.sur, q.pass]];
	con.connect(function(err) {
	  if (err) throw err;
	  con.query(sql, [valIn], function (err, result) {
	    if (err) throw err;
	    console.log(result);
      res.end('Registered');
	  });
	});
  }
}).listen(8080);

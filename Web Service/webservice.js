var express = require('express');
var jwt = require('jsonwebtoken');
var mysql = require('mysql');
var email = require('./app/email');

const app = express();

var con = mysql.createConnection({
  host: "52.15.226.85",
  user: "philip",
  password: "blockchain",
  database: "blockchainDB"
});

app.get('/api', function(req, res){
  email();
  var sql = 'SELECT * FROM users';
  con.query(sql, function (err, result, fields, rows) {
    if (err) throw err;
    console.log(result);
    res.json({
      text: 'my api!',
    });
  });

});

app.post('/api/login', function(req, res){

  var sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  var valP = req.headers["username"];
  var valU = req.headers["password"];
  console.log('name: ' + valP, ' pass: ' + valU);

  con.query(sql, [valP, valU], function (err, result) {
    if (err) res.json({result: 'Something went wrong (error)'});
    if(result[0] == undefined) res.json({Login: 'Failed!'});
	else{
	  console.log(result[0].name);
      const user = { id: result[0].name };
      const token = jwt.sign({ user }, 'blockchain');
      res.json({
        login: 'Success!',
        token: token,
        user: result[0].name
      });
	}
  });
});

app.post('/api/register', function(req, res){
  //auth user
  var sql = 'INSERT INTO users (user_id, name, surname, email, dateOfBirth, password,username,cellphone) VALUES ?';
  var val = [[
    req.headers["id"],
    req.headers["fname"],
    req.headers["lname"],
    req.headers["email"],
    req.headers["birthdate"],
    req.headers["password"],
    req.headers["username"],
    req.headers["cellphone"]
  ]];

  con.query(sql, [val], function (err, result) {
    if (err) res.json({
		  registered: 'failed',
		  error: err
        });
    console.log('inserted val: ' + val);
    res.json({
      registered: 'Success!'
    });
  });
});

app.get('/api/protected', ensureToken, function(req, res){
  jwt.verify(req.token, 'blockchain', function(err, data){
    if(err){
      res.sendStatus(403);
    }
    else {
	  var sql = 'SELECT name, surname FROM users WHERE NOT name IS NULL;';
	  con.query(sql, function (err, result, fields, rows){
		if (err) res.json({
		  result: err
        });
		res.json({
		  result: result
        });
	  });
    }
  })
});

function ensureToken(req, res, next){
  const bearerHeader = req.headers["authentication"];
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }
  else {
    res.sendStatus(403);
  }
}

app.listen(3030, function(){
  console.log('App is listening on port 8080!');
});

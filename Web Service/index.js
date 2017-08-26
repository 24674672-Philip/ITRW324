var express = require('express');
var jwt = require('jsonwebtoken');
var mysql = require('mysql');
const app = express();

var con = mysql.createConnection({
  host: "52.15.226.85",
  user: "philip",
  password: "blockchain",
  database: "blockchainDB"
});

app.get('/api', function(req, res){
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

  var sql = 'SELECT * FROM users WHERE name = ? AND password = ?';
  var valP = "Philip";
  var valU = '123';

  con.query(sql, [valP, valU], function (err, result) {
    if (err) throw err;
    console.log(result[0].name);
    const user = { id: result[0].name };
    const token = jwt.sign({ user }, 'blockchain');
    res.json({
      token: token,
      user: result[0].name
    });
  });
});

app.post('/api/register', function(req, res){
  //auth user

  var sql = 'INSERT INTO users (name, surname, password) VALUES ?';
  var val = '';

  con.query(sql, [val], function (err, result) {
    if (err) throw err;
    console.log(result);
  });

  const user = { id: 3 };
  const token = jwt.sign({ user }, 'blockchain');
  res.json({
    token: token
  });
});

app.get('/api/protected', ensureToken, function(req, res){
  jwt.verify(req.token, 'blockchain', function(err, data){
    if(err){
      res.sendStatus(403);
    }
    else {
      res.json({
        text: 'this is protected',
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

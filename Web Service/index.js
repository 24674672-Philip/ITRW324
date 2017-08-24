var express = require('express');
var jwt = require('jsonwebtoken');
var mysql = require('mysql');
const app = express();

var con = mysql.createConnection({
  host: '52.15.226.85',
  username: 'philip',
  password: 'blockchain',
  database: 'blockchaindb'
});

app.get('/api', function(req, res){
  res.json({
    text: 'my api!'
  });
});

app.post('/api/login', function(req, res){
  //auth user
  
  var sql = 'SELECT * FROM users';
  
  con.query(sql, function (err, result) {
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
        data: data
      });
    }
  })
});

function ensureToken(req, res, next){
  const bearerHeader = req.headers["Auth"];
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
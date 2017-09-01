var express = require('express');
var jwt = require('jsonwebtoken');
var mysql = require('mysql');
var randtoken = require('rand-token');
var fs = require('fs');

const app = express();

var con = mysql.createConnection({
  host: "localhost",
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
  var hash = randtoken.generate(16);
  var sql = 'INSERT INTO users (user_id, name, surname, email, dateOfBirth, password,username,cellphone,isActivated,emailHash) VALUES ?';
  var val = [[
    req.headers["id"],
    req.headers["fname"],
    req.headers["lname"],
    req.headers["email"],
    req.headers["birthdate"],
    req.headers["password"],
    req.headers["username"],
    req.headers["cellphone"],
    0,
    hash
  ]];

  con.query(sql, [val], function (err, result) {
    if (err) res.json({
		  registered: 'failed',
		  error: err
        });
    console.log('inserted val: ' + val);
    var link = hash;
    var emailAddress = req.headers['email'];
    var email = require('./app/email')(link,emailAddress);
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

app.get('/api/activate', function(req, res){
  var hash = req.query.hash;
  var email = req.query.email;
  var sql = 'SELECT emailHash FROM users WHERE email = ?;';
  con.query(sql, email, function(err, result){
    if(err) res.json({
		  result: err
    });
    else if (result[0].emailHash === hash){
      sql = 'UPDATE users SET isActivated = 1 WHERE email = ?';
      con.query(sql,email,function(err, result){
      if(err) res.json({
  		  result: err
      });
      else res.json({
        result: 'Successfully verified account!'
      });
      });
    }
    else res.json({
		  result: 'Something went wrong',
    });
  });
});

/*app.get('/api/music', ensureToken, function(req, res){
  jwt.verify(req.token, 'blockchain', function(err, data){
    if(err){
      res.sendStatus(403);
    }
    else {
      var fileId = req.query.id;
	    var file = __dirname + '/music/' + fileId;
	     fs.exists(file,function(exists){
		     if(exists)
		     {
			   var rstream = fs.createReadStream(file);
			   rstream.pipe(res);
		     }
		     else
		     {
			   res.send("Its a 404");
		     res.end();
		     }
	     });
     }
  })
});*/

app.get('/music', function(req,res){

	var songName = req.query.song;
  var songAlbum = req.query.album;
  var songArtist = req.query.artist;
	var file = __dirname + '/music/' + songArtist + '/' + songAlbum + '/' + songName + '.mp3';
	fs.exists(file,function(exists){
		if(exists)
		{
			var rstream = fs.createReadStream(file);
			rstream.pipe(res);
		}
		else
		{
			res.send("Its a 404");
			res.end();
		}

	});
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

app.listen(8080, function(){
  console.log('App is listening on port 8080!');
});

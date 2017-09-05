var express = require('express');
var jwt = require('jsonwebtoken');
var mysql = require('mysql');
var randtoken = require('rand-token');
var fs = require('fs');

const app = express();

var con = mysql.createPool({
  host: "52.211.85.57",
  user: "philip",
  password: "blockchain",
  database: "blockchainDB"
});

app.get('/api', function(req, res){
  console.log("/api");
  var sql = 'SELECT * FROM users';
  con.query(sql, function (err, result, fields, rows) {
    if (err) res.json({
      error: err
    });
    console.log(result);
    res.json({
      text: 'my api!'
    });
  });
});

app.get('/test', function(req, res){
  console.log('test');
  res.json({
    test: 'test success',
  });
});

app.post('/api/login', function(req, res){
  console.log("/api/login");
  var sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  var valP = req.headers["username"];
  var valU = req.headers["password"];
  console.log('name: ' + valP, ' pass: ' + valU);

  con.query(sql, [valP, valU], function (err, result) {
    if (err) res.json({result: 'Something went wrong (error)'});
    if(result[0] == undefined) res.json({login: "failed"});
	  else{
      if (result[0].isActivated !== 0) {
        console.log(result[0].name);
          const user = { id: result[0].name };
          const token = jwt.sign({ user }, 'blockchain');
          res.json({
            login: 'success',
            token: token,
            user: result[0].username,
            fname: result[0].name,
            lname: result[0].surname,
            email: result[0].email
          });
      }
      else {
        res.json({
          login: "email not registered",
          username: result[0].username
        });
      }
	  }
  });
});

app.post('/api/registeruser', function(req, res){
  console.log("/api/registeruser");

  var emailAddress = req.headers['email'];
  var hash = randtoken.generate(16);
  var sql = 'INSERT INTO users (name, surname, email, dateOfBirth, password,username,isActivated,emailHash) VALUES ?';
  var val = [[
    req.headers["fname"],
    req.headers["lname"],
    req.headers["email"],
    req.headers["birthdate"],
    req.headers["password"],
    req.headers["username"],
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
    var email = require('./app/email')(link,emailAddress);
    var sql2 = 'SELECT user_id FROM users WHERE emailHash = ?'

    con.query(sql2,hash,function(err, res){
      console.log(res);
      res.json({
  	  register: "success",
  	  userid: res[0].user_id
      });
    });
  });


});

app.get('api/registeraddress', function(req, res){
  console.log("/api/registeruser");

  var sql2 = 'INSERT INTO user_address (Country, City, AddressLine1, AddressLine2, PostalCode, user_id) VALUES ?';
  var valAddress = [[
    req.headers["country"],
    req.headers["city"],
    req.headers["addline1"],
    req.headers["addline2"],
    req.headers["postalcode"],
    req.headers["userid"]
  ]];

  con.query(sql2, [valAddress], function(err, result){
    if (err) res.json({ error: err });
    res.json({
    registered: 'success'
    });
  });

});
app.get('/api/protected', ensureToken, function(req, res){
  console.log("/api/protected");
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
  console.log("/api/activate");
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

app.get('/download', function(req,res){
  console.log("/api/download");
	var songName = req.query.song;
  var songAlbum = req.query.album;
  var songArtist = req.query.artist;
	var file = __dirname + '/music/' + songArtist + '/' + songAlbum + '/' + songName + '.mp3';
  fs.exists(file,function(exists){
		if(exists)
		{
			res.setHeader('Content-disposition', 'attachment; filename=' + fileId);
			res.setHeader('Content-Type', 'application/audio/mpeg3')
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

app.get('/music', function(req,res){
  console.log("/api/music");
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

app.post('/api/checkusername', function(req, res){
  console.log("/api/checkusername");
  var uName = req.headers["username"];
  var sql = 'SELECT username FROM users WHERE username = ?';
  if (uName !== undefined) {
    con.query(sql, uName, function (err, result) {
      if (err)  res.json({
            error: err
          });
      if(result[0] === undefined){
        res.json({
          username: 'available'
        });
      }
      else {
        res.json({
          username: 'taken'
        });
      }
    });
  }
  else {
    res.json({
          error: "error"
    });
  }
});

app.post('/api/checkemail', function(req, res){
  console.log("/api/checkemail");
  var emailA = req.headers["email"];
  var sql = 'SELECT email FROM users WHERE email = ?';
  if (emailA !== undefined) {
    con.query(sql, emailA, function (err, result) {
      if (err)  res.json({
            error: err
          });
      if(result[0] === undefined){
        res.json({
          email: 'available'
        });
      }
      else {
        res.json({
          email: 'taken'
        });
      }
    });
  }
  else {
    res.json({
          error: "error"
    });
  }
});

app.post('/api/resendemail', function(req, res){
  console.log("/api/resendemail");
  var user = req.headers["username"];
  var sql = 'SELECT emailHash, email FROM users WHERE username = ?';
  if(user !== undefined || user !== ""){
	con.query(sql, user, function(err, result){
    if (err) {res.json({error: err});}
    if (result[0] === undefined) {res.json({error: "user doesn't exist"});}
    else {
      var link = result[0].hash;
      var resend = require('./app/email')(link,result[0].email);
      res.json({status: "email send"});
    }
  });
  }
  else {res.json({error: "welp"});}
})

app.get('/image', function (req, res, next) {
  console.log('/image');
  var fileName = req.headers["imagename"];
  console.log("filename: " + fileName);
  res.sendFile(__dirname + '\\images\\' + fileName, function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
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

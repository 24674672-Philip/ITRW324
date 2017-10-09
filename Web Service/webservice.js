var express = require('express');
var jwt = require('jsonwebtoken');
var mysql = require('mysql');
var randtoken = require('rand-token');
var fs = require('fs');
var ms = require('mediaserver');
var cors = require('cors');
var upload = require('express-fileupload')

const app = express();

app.use(cors({origin: 'http://52.208.193.120:8080'}));
app.use(upload());

var con = mysql.createPool({
  connectionLimit : 30,
  host: "52.211.85.57",
  user: "philip",
  password: "blockchain",
  database: "blockchainDB"
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

app.get('/api', function(req, res){
  console.log("/api");
  var qry = require('./app/api')('SELECT * FROM users','',con, res);
});

app.get('/test', function(req, res){
  console.log('test');
  res.json({
    test: 'test success',
  });
});

app.post('/api/login', function(req, res){
  console.log("/api/login");
  var qry = require('./app/login')(req, res, con, jwt);
});

app.post('/api/registeruser', function(req, res){
  console.log("/api/registeruser");
  var qry = require('./app/register')(req, res, con);
});

app.post('/api/registeraddress', function(req, res){
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

  var qry = require('./app/api')(sql2,valAddress,con, res);

});

app.get('/api/protected', ensureToken, function(req, res){
  console.log("/api/protected");
  jwt.verify(req.token, 'blockchain', function(err, data){
    if(err){
      res.sendStatus(403);
    }
    else {
      var qry = require('./app/api')('SELECT * FROM users','',con, res);
    }
  })
});

app.get('/api/activate', function(req, res){
  console.log("/api/activate");
  var qry = require('./app/activate')(req, res, con);
});

app.get('/api/music', function(req, res){
  console.log("/api/music");
  var token = req.query.token;
  jwt.verify(token, 'blockchain', function(err, data){
    if(err){
      res.sendStatus(403);
    }
    else {
      var songName = req.query.song;
      var songAlbum = req.query.album;
      var songArtist = req.query.artist;
    	var file = __dirname + '/music/' + songArtist + '/' + songAlbum + '/' + songName + '.mp3';
    	fs.exists(file,function(exists){
    		if(exists)
    		{
          ms.pipe(req,res,file);
    		}
    		else
    		{
    			res.json({error: "Its a 404"});
    		}
    	});
     }
  })
});

app.get('/api/download', function(req, res){
  console.log("/api/download");
  var token = req.query.token;
  jwt.verify(token, 'blockchain', function(err, data){
    if(err){
      res.sendStatus(403);
    }
    else {
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
     }
  })
});

app.post('/api/checkusername', function(req, res){
  console.log("/api/checkusername");
  var uName = req.headers["username"];
  var sql = 'SELECT username FROM users WHERE username = ?';
  if (uName !== undefined) {
    var qry = require('./app/api')(sql,uName,con, res);
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
    var qry = require('./app/api')(sql,emailA,con, res);
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
    var qry = require('./app/resendemail')(sql,user,con, res);
  }
  else {res.json({error: "welp"});}
});

app.get('/api/image', function(req, res){
  console.log("/api/image");
  if (req.query.type == "users") {
    var fileName = req.query.image_name;
    console.log("filename: " + fileName);
    var file = __dirname + '\\images\\users\\' + fileName;
    fs.exists(file,function(exists){
      if(exists)
      {
        ms.pipe(req,res,file);
      }
      else
      {
        res.json({error: "Its a 404"});
      }
  });
} else if (req.query.type == "albums") {
    var fileName = req.query.image_name;
    console.log("filename: " + fileName);
    var file = __dirname + '\\images\\albums\\' + fileName;
    fs.exists(file,function(exists){
      if(exists)
      {
        ms.pipe(req,res,file);
      }
      else
      {
        res.json({error: "Its a 404"});
      }
    });
  }
  else {
    res.sendStatus(403);
  }
});

app.get('/api/getimagename', function(req, res){
  console.log("/api/getimagename");
  if (req.headers["type"] == "albums") {
    var qry = require('./app/apisend')('SELECT image_name FROM album WHERE albumID = ?',req.headers["id"],con, res);
  } else if (req.headers["type"] == "users") {
    var qry = require('./app/apisend')('SELECT profilepicture AS image_name FROM users WHERE user_id = ?',req.headers["id"],con, res);
  } else {
    res.json({error: "no such picture"});
  }
});

app.get('/api/validtoken',ensureToken, function(req, res){
  jwt.verify(req.token, 'blockchain', function(err, data){
    if (err) {
      res.json({tokenStatus: 'Invalid'});
    }
    else {
      res.json({tokenStatus: data});
    }
  });
});

app.post('/api/getsongs', function(req, res){
  console.log("/api/getsongs");
  var sql = 'SELECT musicID, AlbumID, artistID, Artist, Album, Title, album_image, Explicit FROM song_details LIMIT ?,20;'
  var val = req.headers['page'] * 20;
  var qry = require('./app/api')(sql,val,con, res);
});

app.post('/api/getalbums', function(req, res){
  console.log("/api/getsongs");
  var sql = 'SELECT AlbumID, ArtistID, Artist, Album, image_name, profilepicture FROM artist_albums LIMIT ?,20;'
  var val = req.headers['page'] * 20;
  var qry = require('./app/api')(sql,val,con, res);
});

app.post('/api/getartists', function(req, res){
  console.log("/api/getsongs");
  var sql = 'SELECT ArtistID, Artist, profilepicture, bio, number_of_albums FROM artists LIMIT ?,20;'
  var val = req.headers['page'] * 20;
  var qry = require('./app/api')(sql,val,con, res);
});

app.post('/api/getsongdetails', function(req, res){
  console.log("/api/getsongdetails");
  var sql = 'SELECT musicID, AlbumID, artistID, Artist, Album, Title, album_image, Explicit FROM song_details WHERE Title = ?;'
  var qry = require('./app/api')(sql,req.headers["songname"],con, res);
});

app.post('/api/getalbumsongs', function(req, res){
  console.log("/api/getalbumsongs");
  var sql = 'SELECT musicID, AlbumID, artistID, Artist, Album, Title, album_image, artist_image, Explicit, Released FROM song_details WHERE AlbumID = ?;'
  var qry = require('./app/api')(sql,req.headers["albumid"],con, res);
});

app.post('/api/artistalbums', function(req, res){
  console.log("/api/artistalbums");
  var sql = 'SELECT AlbumID, ArtistID, Artist, Album, image_name, Released FROM artist_albums WHERE ArtistID = ?;'
  var qry = require('./app/api')(sql,req.headers["artistid"],con, res);
});

app.post('/api/playlistitems', function(req, res){
  console.log("/api/playlistitems");
  var sql = 'SELECT musicID, AlbumID, artistID, Artist, Album, Title, album_image, Explicit FROM playlist_items WHERE playlistid = ?;'
  var qry = require('./app/api')(sql,req.headers["playlistid"],con, res);
});

app.post('/api/userplaylists', function(req, res){
  console.log("/api/userplaylists");
  var sql = 'SELECT Playlist, Created, Items_in_playlist, idplaylist_details AS playlistid FROM user_playlists WHERE Username = ? ORDER BY Created DESC;'
  var qry = require('./app/api')(sql,req.headers["username"],con, res);
});

app.post('/api/upload',function(req, res){
  if(req.files){
    var file = req.files.filetoupload;
    var filename = file.name;
    file.mv("./images/" + filename, function(err){
      if(err) res.send('error');
      else {
        res.send('done');
      }
    })
  }
});

app.listen(8080, function(){
  console.log('App is listening on port 8080!');
});

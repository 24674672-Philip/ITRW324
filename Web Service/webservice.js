//packages used
var express = require('express');
var jwt = require('jsonwebtoken');
var mysql = require('mysql');
var randtoken = require('rand-token');
var fs = require('fs');
var ms = require('mediaserver');
var cors = require('cors');
var fileUpload = require('express-fileupload')
var path = require('path');
const Web3 = require('web3');
const solc = require('solc');
var os = require('os');
var Busboy = require('busboy');
const NodeID3 = require('node-id3')

//creates app object of express
const app = express();

//Allows headers from this ip/adderss and uses fileUpload
app.use(cors({origin: 'http://ripmusic.tk/'}));
app.use(fileUpload());

//creates connection pool limiting to 30 concurrent connections
var con = mysql.createPool({
  connectionLimit : 30,
  host: "localhost",
  user: "philip",
  password: "blockchain",
  database: "blockchainDB",
  multipleStatements: true,
  debug: true
});

//ensures that the authentication header is there
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

//test to see if webservice is online
app.get('/test', function(req, res){
  console.log('test')
  res.json({
    test: 'test success',
  });
});

//calls login module
app.post('/api/login', function(req, res){
  console.log("/api/login");
  var qry = require('./app/login')(req, res, con, jwt);
});

//calls register module
app.post('/api/registeruser', function(req, res){
  console.log("/api/registeruser");
  var qry = require('./app/register')(req, res, con, randtoken);
});

//registers user address
app.post('/api/registeraddress', function(req, res){
  console.log("/api/registeruser");

  var sql2 = 'INSERT INTO user_address (Country, City, AddressLine1, AddressLine2, PostalCode, user_id) VALUES (?)';
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

//get adderss per user
app.get('/api/getaddress', function(req, res){
  console.log("/api/getaddress");
  var sql = 'SELECT * FROM user_address WHERE user_id = ?;'
  var val = req.headers['userid'];
  var qry = require('./app/apisend')(sql,val,con, res);
});

//set user address per user
app.post('/api/setaddress', function(req, res){
  console.log("/api/setaddress");
  var sql = 'UPDATE user_address SET Country = ?, City = ?, AddressLine1 = ?, AddressLine2 = ?, PostalCode = ? WHERE user_id = ?;';
  var val1 = req.headers["country"];
  var val2 = req.headers["city"];
  var val3 = req.headers["addline1"];
  var val4 = req.headers["addline2"];
  var val5 = req.headers["postalcode"];
  var val6 = req.headers["userid"];
  var qry = require('./app/update')(sql,[val1, val2, val3, val4, val5, val6],con,res);
});

//Activate user account from email link
app.get('/api/activate', function(req, res){
  console.log("/api/activate");
  var qry = require('./app/activate')(req, res, con);
});

//Gets music from server
app.get('/api/music', function(req, res){
  console.log("/api/music");
  var token = req.query.token;
  jwt.verify(token, 'blockchain', function(err, data){
    if(err){
      res.sendStatus(403);
    }
    else {//Where music is located on the server
      var songName = req.query.song;
      var songAlbum = req.query.album;
      var songArtist = req.query.artist;
    	var file = __dirname + '/music/' + songArtist + '/' + songAlbum + '/' + songName + '.mp3';
    	fs.exists(file,function(exists){
    		if(exists)
    		{//if music exists it will pipe
          ms.pipe(req,res,file);
          var qry = require('./app/songplayed')(con, res, req);
    		}
    		else
    		{
    			res.json({error: "Its a 404"});
    		}
    	});
     }
  })
});

//download music file
app.get('/api/download', function(req, res){
  console.log("/api/download");
  var token = req.query.token;
  jwt.verify(token, 'blockchain', function(err, data){
    if(err){
      res.sendStatus(403);
    }
    else {
      con.getConnection(function(err, connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }
        connection.query("SELECT * FROM transaction WHERE user__id = ? AND song_id = ?",[req.query.userid,req.headers.songid],function(err,result){
          connection.release();
          if(err){res.json(err);}
          else {
            if(result !== undefined){
              var songName = req.query.song;
              var songAlbum = req.query.album;
              var songArtist = req.query.artist;
              var file = __dirname + '/music/' + songArtist + '/' + songAlbum + '/' + songName + '.mp3';
              fs.exists(file,function(exists){
                if(exists)
                {//sends the file with headers

                  console.log(result.hash);

                  let tags = {
                    encodedBy: "RIP",
                    copyright: result.hash
                  };

                  let ID3FrameBuffer = NodeID3.create(tags)

                  let success = NodeID3.update(tags, file); //  Returns true/false
                  NodeID3.update(tags, file, function(err) {  });

                  res.download(file);
                }
                else
                {
                  res.send("Its a 404");
                  res.end();
                }
              });
            }
            else{
              res.json({result: "failed"});
            }
          }
        });
      });
    }
  })
});

//checks if username exists
app.post('/api/checkusername', function(req, res){
  console.log("/api/checkusername");
  var uName = req.headers["username"];
  var sql = 'SELECT username FROM users WHERE username = ?';
  if (uName !== undefined) {
    var qry = require('./app/checkvalue')(sql,uName,con, res);
  }
  else {
    res.json({
          error: "error"
    });
  }
});

//checks if email exists
app.post('/api/checkemail', function(req, res){
  console.log("/api/checkemail");
  var emailA = req.headers["email"];
  var sql = 'SELECT email FROM users WHERE email = ?';
  if (emailA !== undefined) {
    var qry = require('./app/checkvalue')(sql,emailA,con, res);
  }
  else {
    res.json({
          error: "error"
    });
  }
});

//resends validation email
app.post('/api/resendemail', function(req, res){
  console.log("/api/resendemail");
  var user = req.headers["username"];
  var sql = 'SELECT emailHash, email FROM users WHERE username = ?';
  if(user !== undefined || user !== ""){//checks if user exists
    var qry = require('./app/resendemail')(sql,user,con, res);
  }
  else {res.json({error: "welp"});}
});

//sends image
app.get('/api/image', function(req, res){
  console.log("/api/image");
  if (req.query.type == "users") {
    var fileName = req.query.image_name;
    console.log("filename: " + fileName);
    var file = __dirname + '\\images\\users\\' + fileName;
    fs.exists(file,function(exists){//if user and exists
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
    fs.exists(file,function(exists){//if album image and exists
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

//gets the name of the profilepicture or album art
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

//checks if token is still active
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

//returns song info
app.post('/api/getsongs', function(req, res){
  console.log("/api/getsongs");
  var sql = 'SELECT musicID, AlbumID, artistID, Artist, Album, Title, album_image, Explicit, Path AS file_name FROM song_details LIMIT ?,20;'
  var val = req.headers['page'] * 20;
  var qry = require('./app/api')(sql,val,con, res);
});

//returns song info
app.post('/api/userbio', function(req, res){
  console.log("/api/userbio");
  var sql = 'SELECT bio FROM users WHERE username = ?'
  var val = req.headers["username"];
  var qry = require('./app/apisend')(sql,val,con, res);
});

//returns album info
app.post('/api/getalbums', function(req, res){
  console.log("/api/getalbums");
  var sql = 'SELECT AlbumID, ArtistID, Artist, Album, image_name, profilepicture FROM artist_albums LIMIT ?,20;'
  var val = req.headers['page'] * 20;
  var qry = require('./app/api')(sql,val,con, res);
});

//returns artist info
app.post('/api/getartists', function(req, res){
  console.log("/api/getartists");
  var sql = 'SELECT ArtistID, Artist, profilepicture, bio, number_of_albums FROM artists LIMIT ?,20;'
  var val = req.headers['page'] * 20;
  var qry = require('./app/api')(sql,val,con, res);
});

//returns song search results
app.post('/api/searchsongs', function(req, res){
  console.log("/api/searchsongs");
  var val2 = req.headers['page'] * 20;
  var val1 = req.headers['searchterm'];
  var sql = "SELECT musicID, AlbumID, artistID, Artist, Album, Title, album_image, Explicit FROM song_details WHERE Title LIKE "+mysql.escape('%' + val1 + '%')+" LIMIT ?,3;"
  var qry = require('./app/api')(sql,val2,con, res);
});

//returns album search results
app.post('/api/searchalbums', function(req, res){
  console.log("/api/searchalbums");
  var val2 = req.headers['page'] * 20;
  var val1 = req.headers['searchterm'];
  var sql = "SELECT AlbumID, ArtistID, Artist, Album, image_name, profilepicture FROM artist_albums WHERE Album LIKE "+mysql.escape('%' + val1 + '%')+" LIMIT ?,3;"
  var qry = require('./app/api')(sql,val2,con, res);
});

//returns artist search results
app.post('/api/searchartists', function(req, res){
  console.log("/api/searchartists");
  var val2 = req.headers['page'] * 20;
  var val1 = req.headers['searchterm'];
  var sql = "SELECT ArtistID, Artist, profilepicture, bio, number_of_albums FROM artists WHERE Artist LIKE "+mysql.escape('%' + val1 + '%')+" LIMIT ?,3;"
  var qry = require('./app/api')(sql,val2,con, res);
});

//calls artist module
app.post('/api/getartist', function(req, res){
  console.log("/api/getartist");
  var qry = require('./app/artist')(con, res, req);
});

//returns spesific song details
app.post('/api/getsongdetails', function(req, res){
  console.log("/api/getsongdetails");
  var sql = 'SELECT musicID, AlbumID, artistID, Artist, Album, Title, album_image, Explicit FROM song_details WHERE Title = ?;'
  var qry = require('./app/api')(sql,req.headers["songname"],con, res);
});

//returns spesific albums songs
app.post('/api/getalbumsongs', function(req, res){
  console.log("/api/getalbumsongs");
  var sql = 'SELECT musicID, AlbumID, artistID, Artist, Album, Title, album_image, artist_image, Explicit, Released, album_price AS price FROM song_details WHERE AlbumID = ?;'
  var qry = require('./app/api')(sql,req.headers["albumid"],con, res);
});

//returns spesific albums songs
app.post('/api/getuseralbumsongs', function(req, res){
  console.log("/api/getalbumsongs");
  var sql = 'SELECT musicID, AlbumID, artistID, Artist, Album, Title, album_image, artist_image, Explicit, song_price, Released FROM user_song_details WHERE AlbumID = ?;'
  var qry = require('./app/api')(sql,req.headers["albumid"],con, res);
});

//returns spesific artists albums
app.post('/api/artistalbums', function(req, res){
  console.log("/api/artistalbums");
  var sql = 'SELECT AlbumID, ArtistID, Artist, Album, image_name, Released FROM artist_albums WHERE ArtistID = ?;'
  var qry = require('./app/api')(sql,req.headers["artistid"],con, res);
});

//returns bought songs per user
app.post('/api/getpurchased', ensureToken, function(req, res){
  console.log("/api/getpurchased");
  jwt.verify(req.token, 'blockchain', function(err, data){
    if(err){
      res.sendStatus(403);
    }
    else {
      var sql = 'SELECT * FROM purchased_songs WHERE user__id = ?;'
      var qry = require('./app/api')(sql,req.headers["userid"],con, res);
    }
  });
});

//returns bought songs per user
app.post('/api/ispurchased', ensureToken, function(req, res){
  console.log("/api/getpurchased");
  jwt.verify(req.token, 'blockchain', function(err, data){
    if(err){
      res.sendStatus(403);
    }
    else {
      var sql = 'SELECT * FROM purchased_songs WHERE user__id = ? AND song_id = ?;'
      var qry = require('./app/checksong')(sql,[req.headers["userid"],req.headers["songid"]],con, res);
    }
  });
});

//adds tokens
app.post('/api/addtokens', ensureToken, function(req, res){
  console.log("/api/addtokens");
  jwt.verify(req.token, 'blockchain', function(err, data){
    if(err){
      res.sendStatus(403);
    }
    else {
      var sql = 'UPDATE users SET coins = coins + ? WHERE user_id = ?;'
      var qry = require('./app/update')(sql,[req.headers["coins"],req.headers["userid"]],con, res);
    }
  });
});

//returns items in playlist
app.post('/api/playlistitems', function(req, res){
  console.log("/api/playlistitems");
  var sql = 'SELECT musicID, AlbumID, artistID, Artist, Album, Title, album_image, Explicit FROM playlist_items WHERE playlistid = ?;'
  var qry = require('./app/api')(sql,req.headers["playlistid"],con, res);
});

//returns users playlists
app.post('/api/userplaylists', function(req, res){
  console.log("/api/userplaylists");
  var sql = 'SELECT Playlist, Created, Items_in_playlist, idplaylist_details AS playlistid FROM user_playlists WHERE Username = ? ORDER BY Created DESC;'
  var qry = require('./app/api')(sql,req.headers["username"],con, res);
});

//allows it to edit user bio
app.post('/api/edituserbio', ensureToken, function(req, res){
  console.log("/api/edituser");
  jwt.verify(req.token, 'blockchain', function(err, data){
    if(err){
      res.sendStatus(403);
    }
    else {
        var qry = require('./app/edituser')(req, res, con);
    }
  });
});

//creatoin of new albunm
app.post('/api/createalbum', ensureToken, function(req, res){
  console.log("/api/createalbum");
  jwt.verify(req.token, 'blockchain', function(err, data){
    if(err){
      res.sendStatus(403);
    }
    else {
      var sql = 'INSERT INTO album (album_name, userid) VALUES (?);';
      var val = [[
        req.headers["albumname"],
        req.headers["userid"]
      ]];
      var qry = require('./app/newalbum')(sql, val, con, res, req);
    }
  });
});

//edit album details
app.post('/api/editalbum', ensureToken, function(req, res){
  console.log("/api/editalbum");
  jwt.verify(req.token, 'blockchain', function(err, data){
    if(err){
      res.sendStatus(403);
    }
    else {
      var val3 = 0;
      var sql = "UPDATE album SET album_name = ?, price = ? WHERE albumID = ?;";
      var val1 = req.headers["albumname"];
      var val2 = req.headers["price"];
      val3 = req.headers["id"];
      var qry = require('./app/update')(sql, [val1, val2, val3], con, res);
    }
  });
});

//release an album
app.post('/api/releasealbum', ensureToken, function(req, res){
  console.log("/api/releasealbum");
  jwt.verify(req.token, 'blockchain', function(err, data){
    if(err){
      res.sendStatus(403);
    }
    else {
      var sql = "UPDATE album SET released = ?, `release date` = CURRENT_TIMESTAMP WHERE albumID = ?;";
      var val1 = 1;
      var val2 = req.headers["id"];
      var qry = require('./app/update')(sql, [val1, val2], con, res);
    }
  });
});

//delete an album
app.post('/api/deletealbum', ensureToken, function(req, res){
  console.log("/api/deletealbum");
  jwt.verify(req.token, 'blockchain', function(err, data){
    if(err){
      res.sendStatus(403);
    }
    else {
      var sql = "DELETE FROM album WHERE albumID = ?;";
      var val = req.headers["id"];
      var qry = require('./app/update')(sql, val, con, res);
    }
  });
});

//add a song (without upload)
app.post('/api/createsong', ensureToken, function(req, res){
  console.log("/api/createsong");
  jwt.verify(req.token, 'blockchain', function(err, data){
    if(err){
      res.sendStatus(403);
    }
    else {
      var sql = 'INSERT INTO song (Title, Explicit, album_ID, artistID, Path, price) VALUES (?);';
      var val = [[
        req.headers["title"],
        req.headers["explicit"],
        req.headers["albumid"],
        req.headers["userid"],
        req.headers["file_name"],
        req.headers["price"]
      ]];
      var qry = require('./app/update')(sql, val, con, res);
    }
  });
});

//edit a songs details such as names
app.post('/api/editsong', ensureToken, function(req, res){
  console.log("/api/editsong");
  jwt.verify(req.token, 'blockchain', function(err, data){
    if(err){
      res.sendStatus(403);
    }
    else {
      var sql = "UPDATE song SET title = ?, price = ? WHERE musicID = ?;";
      var val1 = req.headers["title"];
      var val2 = req.headers["price"];
      var val3 = req.headers["musicid"];
      var qry = require('./app/update')(sql, [val1, val2, val3], con, res);
    }
  });
});

//deteles song
app.post('/api/deletesong', ensureToken, function(req, res){
  console.log("/api/deletesong");
  jwt.verify(req.token, 'blockchain', function(err, data){
    if(err){
      res.sendStatus(403);
    }
    else {
      var sql = "DELETE FROM song WHERE musicID = ?;";
      var val = req.headers["musicid"];
      var qry = require('./app/update')(sql, val, con, res);
    }
  });
});

//buy coins from blockchain network
app.post('/api/buycoins', ensureToken, function(req, res){
  console.log("/api/buycoins");
  jwt.verify(req.token, 'blockchain', function(err, data){
    if(err){
      res.sendStatus(403);
    }
    else {

    }
  });
});

//buys song on blockchain network
app.post('/api/buysongs', ensureToken, function(req, res){
  console.log("/api/buysongs");
  jwt.verify(req.token, 'blockchain', function(err, data){
    if(err){
      res.sendStatus(403);
    }
    else {
      var qry = require('./app/buysong')(req, res, con, randtoken);
    }
  });
});

//gets the songs bought on the network
app.get('/api/songsbought', ensureToken, function(req, res){
  console.log("/api/songsbought");
  jwt.verify(req.token, 'blockchain', function(err, data){
    if(err){
      res.sendStatus(403);
    }
    else {

    }
  });

});

//gets details of the purchase
app.get('/api/boughtsongdetails', ensureToken, function(req, res){
  console.log("/api/boughtsongdetails");
  jwt.verify(req.token, 'blockchain', function(err, data){
    if(err){
      res.sendStatus(403);
    }
    else {

    }
  });
});

//gets the avg cost of songs
app.get('/api/getavgsongcost', function(req, res){
  console.log("/api/getavgsongcost");
  var sql = 'SELECT ROUND(AVG(price),2) as result FROM song';
  var qry = require('./app/apisend')(sql, '', con, res);
});

//gets the avg costs of albums
app.get('/api/getavgalbumcost', function(req, res){
  console.log("/api/getavgalbumcost");
  var sql = 'SELECT ROUND(AVG(price),2) as result FROM album';
  var qry = require('./app/apisend')(sql, '', con, res);
});

//gets the users balance of coins
app.get('/api/userbalance',ensureToken, function(req, res){
  console.log("/api/userbalance");
  jwt.verify(req.token, 'blockchain', function(err, data){
    if(err){
      res.sendStatus(403);
    }
    else {
      var val = req.headers["username"];
      var sql = 'SELECT coins as result FROM users WHERE username = ?';
      var qry = require('./app/apisend')(sql, val, con, res);
    }
  });
});

//password reset email
app.post('/api/sendpasswordreset', function(req, res){
  console.log("/api/sendpasswordreset");
  var emailResetPassword = require('./app/resetpassword')(req.headers["email"],jwt);
});

//checks code and if true resets password
app.post('/api/passwordreset', function(req, res){
  console.log("/api/sendpasswordreset");
  jwt.verify(req.headers["token"],'passreset',function(err,data){
    var val1 = req.headers["email"];
    if(err){res.json({error: err});}
    else{
      if(data.user.email === val1){
        var sql = "UPDATE users SET password = ? WHERE email = ?";
        var val = req.headers["password"];
        var qry = require('./app/update')(sql, [val,val1], con, res);
      }
      else {
        res.json({result: "error"});
      }
    }
  });
});

//uploads a new image (change pp or album image)
app.post('/api/uploadImage', function(req, res) {
  console.log("/api/uploadImage");
  if (!req.files)
    return res.status(400).send('No files were uploaded.');


  let uploadedFile = req.files.artPicture;
  console.log(req.files.artPicture);
  //Is an image
  if(uploadedFile.mimetype.indexOf("image") > -1){
    if(req.headers["type"] === "user"){//user image
      uploadedFile.mv('./images/users' + uploadedFile.name, function(err) {
        if (err)
          return res.sendStatus(500);

          var sql = "UPDATE users SET profilepicture = ? WHERE user_id = ?";
          var val = req.headers["userid"];
          var qry = require('./app/update')(sql,  [uploadedFile.name,val], con, res);
      });
    }
    else if(req.headers["type"] === "album"){//album image
      uploadedFile.mv('./images/albums/' + uploadedFile.name, function(err) {
        if (err)
          return res.sendStatus(500);

          var sql = "UPDATE album SET image_name = ? WHERE albumID = ?";
          var val = req.headers["albumID"];
          var qry = require('./app/update')(sql, [uploadedFile.name,val], con, res);
      });
    }
    else {
      res.json({result: 'Incorrect type'});
    }
  }
});

//for uploading an album (adds image for album and song array)
app.post('/api/uploadalbum', function(req, res) {
  console.log("/api/uploadalbum");
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  let uploadedArt = req.files.artPicture;
  let uploadedSongs = req.files.songs;
  let songDetailsArray = req.files.songdetails;

  var amountOfSongs = req.headers["length"];
  console.log('Length: ' + amountOfSongs);
  var albumTitle = req.headers["title"];
  console.log('album title: ' + albumTitle);
  var artist = req.headers["username"];
  console.log('Artist: ' + artist);

  var path = __dirname + '/music/' + artist + '/' + albumTitle;

  if(!fs.existsSync(path)){
    fs.mkdirSync(path);
  }

  if(amountOfSongs > 1){
    for (let songs of uploadedSongs) {
      if(!fs.existsSync(path+'/'+songs.name)){
      console.log(songs);
        console.log('added song: ' + songs.name);
        songs.mv(path + '/' + songs.name, function(err) {
          if (err)
            return res.sendStatus(500);
        });
      }
    }
  }
  else {
    if(!fs.existsSync(path+'/'+uploadedSongs.name)){
    console.log(uploadedSongs);
      console.log('added song: ' + uploadedSongs.name);
      uploadedSongs.mv(path + '/' + uploadedSongs.name, function(err) {
        if (err)
          return res.sendStatus(500);
      });
    }
  }

  if(uploadedArt.name !== undefined){
    uploadedArt.mv('./images/albums/' + uploadedArt.name, function(err) {
      if (err)
        return res.sendStatus(500);

      var qry = require('./app/update')("UPDATE album SET image_name = ? WHERE album_name = ?", [uploadedArt.name,req.headers["title"]], con, res);
    });
  }
});

//listens on this port of the local machine
app.listen(8080, function(){
  console.log('App is listening on port 8080!');
});

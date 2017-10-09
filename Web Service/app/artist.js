
module.exports = function(con, res, req){

  if (req.headers["artistname"] !== undefined) {
    var sql = 'SELECT ArtistID, Artist, profilepicture, bio, number_of_albums FROM artists WHERE Artist = ?;'
    var sql2 = 'SELECT AlbumID, Album, image_name, Released FROM artist_albums WHERE Artist = ?;'
    val = req.headers["artistname"];
  } else if(req.headers["artistid"] !== undefined) {
    var sql = 'SELECT ArtistID, Artist, profilepicture, bio, number_of_albums FROM artists WHERE ArtistID = ?;'
    var sql2 = 'SELECT AlbumID, Album, image_name, Released FROM artist_albums WHERE ArtistID = ?;'
    val = req.headers["artistid"];
  }
  else {
    res.sendStatus(404);
    return;
  }

  con.getConnection(function(err, connection){
    if (err) {
      connection.release();
      res.json({"code" : 100, "status" : "Error in connection database"});
      return;
    }

    console.log('connected as id ' + connection.threadId);

    connection.query(sql,val,function(err,rows){
      if(!err) {
        connection.query(sql2,val,function(err,result){
          connection.release();
          if(!err) {
            res.json({artist: rows,
                      albums: result});
          }
        });
      }
    });

    connection.on('error', function(err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
    });
  });
}

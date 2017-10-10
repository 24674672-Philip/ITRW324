module.exports = function(con, res, req){

  var sql = "UPDATE song SET Played = Played+1 WHERE Title = ?";
  var val2 = req.query.song;

  con.getConnection(function(err, connection){
    if (err) {
      connection.release();
      console.log({"code" : 100, "status" : "Error in connection database"});
      return;
    }

    console.log('connected as id ' + connection.threadId);

    connection.query(sql,[val1,val2],function(err,result){
      connection.release();
      if(!err) {
        console.log({result: "success"});
      }
    });

    connection.on('error', function(err) {
          console.log({"code" : 100, "status" : "Error in connection database", "err" : err});
          return;
    });
  });
}

module.exports = function(sql, val, con, res, req){

  con.getConnection(function(err, connection){
    if (err) {
      connection.release();
      res.json({"code" : 100, "status" : "Error in connection database"});
      return;
    }

    console.log('connected as id ' + connection.threadId);
    console.log(val);
    connection.query(sql,val,function(err,result){
      if(err){res.json(err);}
      else {
        console.log(result);
        connection.query('SELECT albumID FROM album WHERE album_name = ? AND userid = ?;',[req.headers["albumname"],req.headers["userid"]],function(err,resul){
          connection.release();
          if(err){res.json(err);}
          else {
            console.log(result);
            res.json({result: result[0].albumID});
          }
        });
      }
    });
  });
}

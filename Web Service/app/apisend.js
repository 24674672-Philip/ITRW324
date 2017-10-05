
module.exports = function(sql, val, con, res){
  con.getConnection(function(err, connection){
    if (err) {
      connection.release();
      res.json({"code" : 100, "status" : "Error in connection database"});
      return;
    }

    console.log('connected as id ' + connection.threadId);

    connection.query(sql,val,function(err,rows){
            connection.release();
            if(!err) {
              res.json(rows[0]);
            } else {
              res.json({error: err});
            }
    });

    connection.on('error', function(err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
    });
  });
}


module.exports = function(con, res){

  var hash = req.query.hash;
  var email = req.query.email;
  var sql = 'SELECT emailHash FROM users WHERE email = ?;';

  con.getConnection(function(err, connection){
    if (err) {
      connection.release();
      res.json({"code" : 100, "status" : "Error in connection database"});
      return;
    }

    console.log('connected as id ' + connection.threadId);

    connection.query(sql,val,function(err,resul){
      if(err) {
        res.json({error: err});
      }
      else if (resul[0].emailHash === hash) {
        sql = 'UPDATE users SET isActivated = 1 WHERE email = ?';
        connection.query(sql,val,function(err, result){
          connection.release();
          if(err) res.json({
            result: err
          });
          else res.json({
            result: 'Successfully verified account!'
          });
        });
      }
    });
    connection.on('error', function(err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
    });
  });
}


module.exports = function(sql, val, con, res){

  con.getConnection(function(err, connection){
    if (err) {
      connection.release();
      res.json({"code" : 100, "status" : "Error in connection database"});
      return;
    }

    console.log('connected as id ' + connection.threadId);

    connection.query(sql,val,function(err,result){
      connection.release();
      if (result[0] === undefined) {res.json({error: "user doesn't exist"});}
      else {
        var link = result[0].emailHash;
        var resend = require('./email')(link,result[0].email);
        res.json({status: "email sent"});
      }
    });

    connection.on('error', function(err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
    });
  });
}

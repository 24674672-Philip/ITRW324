
module.exports = function(sql, val, con, res){

  con.query(sql, user, function(err, result){
    if (err) {res.json({error: err});}
    if (result[0] === undefined) {res.json({error: "user doesn't exist"});}
    else {
      var link = result[0].hash;
      var resend = require('./app/email')(link,result[0].email);
      res.json({status: "email send"});
    }
  });

  con.getConnection(function(err, connection){
    if (err) {
      connection.release();
      res.json({"code" : 100, "status" : "Error in connection database"});
      return;
    }

    console.log('connected as id ' + connection.threadId);

    connection.query(sql,val,function(err,result){
      connection.release();
      if (err) {res.json({error: err});}
      if (result[0] === undefined) {res.json({error: "user doesn't exist"});}
      else {
        var link = result[0].hash;
        var resend = require('./app/email')(link,result[0].email);
        res.json({status: "email send"});
      }
    });

    connection.on('error', function(err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
    });
  });
}

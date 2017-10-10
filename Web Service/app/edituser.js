module.exports = function(req, res, con){

  var sql = "UPDATE users SET bio = ? WHERE username = ?";
  var val1 = req.headers["bio"];
  var val2 = req.headers["username"];

  con.getConnection(function(err, connection){
    if (err) {
      connection.release();
      res.json({"code" : 100, "status" : "Error in connection database"});
      return;
    }

    console.log('connected as id ' + connection.threadId);

    connection.query(sql,[val1,val2],function(err,result){
      connection.release();
      if(err){res.json(err);}
      else {
        res.json({result: "success"});
      }
    });
  });
}

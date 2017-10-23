module.exports = function(sql, val, con, res){

  con.getConnection(function(err, connection){
    if (err) {
      connection.release();
      res.json({"code" : 100, "status" : "Error in connection database"});
      return;
    }

    console.log('connected as id ' + connection.threadId);
    console.log(val);
    connection.query(sql,val,function(err,result){
      connection.release();
      if(err){res.json(err);}
      else {
        console.log(result);
        if(result === undefined){
          res.json({result: "success"});
        }
        else{
          res.json({result: "failed"});
        }
      }
    });
  });
}

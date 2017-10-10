
module.exports = function(req, res, con){

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

    connection.query(sql,email,function(err,resul){
      if(err){res.redirect('http://reddit.com');}
      else if (resul[0].emailHash === hash) {
        sql = 'UPDATE users SET isActivated = 1 WHERE email = ?';
        connection.query(sql,email,function(err, result){
          connection.release();
          if(err) res.redirect('http://reddit.com');
          else res.json({
            result: 'Successfully verified account!'
          });
          //res.redirect('http://mydomain.com'+req.url)
        });
      }
    });
  });
}

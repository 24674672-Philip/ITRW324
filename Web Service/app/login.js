module.exports = function(req, res, con, jwt){
  var sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  var valP = req.headers["username"];
  var valU = req.headers["password"];
  console.log('name: ' + valP, ' pass: ' + valU);

  con.getConnection(function(err, connection){
    if (err) {
      connection.release();
      res.json({"code" : 100, "status" : "Error in connection database"});
      return;
    }

  connection.query(sql, [valP, valU], function (err, result) {
    if(err){res.json(err);}
    else if(result[0] == undefined) res.json({login: "failed"});
    else{
      if (result[0].isActivated !== 0) {
        console.log(result[0].name);
          const user = { name: result[0].name,
                         id: result[0].id};
          const token = jwt.sign({ user }, 'blockchain', { expiresIn: 18000 });
          res.json({
            login: 'success',
            token: token,
            user: result[0].username,
            fname: result[0].name,
            lname: result[0].surname,
            email: result[0].email
          });
      }
      else {
        res.json({
          login: "email not registered",
          username: result[0].username
        });
      }
    }
  });
});
}

module.exports = function(req, res, con){

    var emailAddress = req.headers['email'];
    var hash = randtoken.generate(16);
    var sql = 'INSERT INTO users (name, surname, email, dateOfBirth, password,username,isActivated,emailHash) VALUES ?';
    var val = [[
      req.headers["fname"],
      req.headers["lname"],
      req.headers["email"],
      req.headers["birthdate"],
      req.headers["password"],
      req.headers["username"],
      0,
      hash
    ]];

    con.getConnection(function(err, connection){
      if (err) {
        connection.release();
        res.json({"code" : 100, "status" : "Error in connection database"});
        return;
      }

      console.log('connected as id ' + connection.threadId);

      connection.query(sql,val,function(err,result){
        if(!err) {
          res.json({register: "success",
      	  userid: resul[0].user_id});
        }
        console.log('inserted val: ' + val);
        var link = hash;
        var email = require('./app/email')(link,emailAddress);
        var sql2 = 'SELECT user_id FROM users WHERE emailHash = ?'
        connection.query(sql2,hash,function(err, resul){
          connection.release();
          if(!err) {
            res.json({register: "success",
        	  userid: resul[0].user_id});
          }
        });
      });

      connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
      });
    });

}

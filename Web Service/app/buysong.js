module.exports = function(req, res, con, randtoken){
    var hash = randtoken.generate(16);
    var sql = 'INSERT INTO transaction (user__id, song_id,cost,hash) VALUES (?)';
    var val = [[
      req.headers["userid"],
      req.headers["songid"],
      req.headers["price"],
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
        console.log('inserted val: ' + val);
        var link = hash;
        var email = require('./app/email')(link,emailAddress);
        var sql2 = 'UPDATE users SET coins = coins - ? WHERE user_id = ?;'
        connection.query(sql2,[req.headers["price"],req.headers["userid"]],function(err, resul){
          connection.query("UPDATE users SET coins = coins + ? WHERE user_id = ?",[req.headers["price"],req.headers["artistid"]],function(err, resul){
            connection.release();
            if(!err) {
              res.json({register: "success",
              userid: resul[0].user_id});
            }
          });
        });
      });
    });
}

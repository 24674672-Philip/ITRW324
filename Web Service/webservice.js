var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'mydb'
});

connection.connect();

var mydbEntry = {
  user_name: 'Philip'
};

connection.query('insert into users set ?', mydb, function(err, result){
  if(err){
    console .error(err);
    return;
  }
  console.console.error((result));
});

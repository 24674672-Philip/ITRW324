var express = require('express');

const app = express();

app.get('/test', function(req, res){
  console.log("test");
  res.json({result: "output"});
});

app.listen(8080, function(){
  console.log('App is listening on port 8080!');
});

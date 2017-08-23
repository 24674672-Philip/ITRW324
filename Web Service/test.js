var http = require('http');
var mysql = require('mysql');
var url = require('url');
var fs = require('fs');
var obj = { "name":"John", "age":30, "city":"New York"};

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var q = url.parse(req.url, true).query;

  var myJSON = JSON.stringify(obj);

}).listen(8080);

var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var q = url.parse(req.url, true).query;
  var txt = q.user + " " + q.pass;
  var login = q.check;
  if(login === 'yes'){
    res.end(txt);
  }
  else {
    res.end('no access');
  }
}).listen(8080);

var http = require("http");
var url = require("url");
var fs = require("fs");
var events = require("events");

http.createServer( function(req, res) {
    console.log("received a request!");

    var q = url.parse(req.url);
    var filename = "." + q.pathname;
    fs.readFile(filename, function(err, data) {
       if (err) {
           res.writeHead(404, {'Content-Type': 'text/html'});
           return res.end("404 Not Found");
       }
       res.writeHead(200, {'Content.Type': 'text/html'});
       res.write(data);
       return res.end();
    });

    console.log("request done!");
}).listen(8080);
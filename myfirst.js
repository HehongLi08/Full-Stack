var http = require("http");
var url = require("url");
var fs = require("fs")
var dt = require("./myfirstmodule")


http.createServer( function(req, res) {

    fs.readFile("./demofile1.html", function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });

    console.log("already provided the HTML file!");

}).listen(8080);
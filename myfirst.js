var http = require("http");
var url = require("url");
var fs = require("fs");
var dt = require("./myfirstmodule");

http.createServer( function(req, res) {

    fs.appendFile("mynewfile1.txt", "Hello content!", function(err) {
        if (err) throw err;
        console.log("Saved!");
    });

    console.log("already provided the HTML file!");

}).listen(8080);
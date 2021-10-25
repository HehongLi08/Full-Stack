var http = require("http");
var url = require("url");
var dt = require("./myfirstmodule")


http.createServer( function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("this is a test!!!</br>");
    res.write("The curr date and time are : " + dt.myDateTime()  + "</br>");

    var q = url.parse(req.url, true).query;
    var txt = q.year + " " + q.month;



    console.log("test!!!");

    res.end(txt);

}).listen(8080);
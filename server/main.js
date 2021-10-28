var http = require("http");
var url = require("url");
var fs = require("fs");
var events = require("events");
var formidable = require("formidable");


http.createServer(function (req, res) {


   if (req.url === "/fileupload") {
      var form = new formidable.IncomingForm();
      form.parse(req, function (err, fields, files) {

         console.log(files.filetoupload);

         var oldpath = files.filetoupload.path;
         var newpath = './' + files.filetoupload.name;
         fs.rename(oldpath, newpath, function(err) {
            if (err) throw err;
            res.write("File moved!");
            res.end();
         })
      });
   }
   else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<form action="fileupload" method="post" enctype="multipart/form-data"> ');
      res.write(' <input type="file" name="filetoupload"><br>');
      res.write('<input type="submit">');
      res.write("</form>");
      return res.end();
   }

}).listen(8080);
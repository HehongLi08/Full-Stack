const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const PORT = process.env.PORT || 3001;
const playersRouter = require("./routes/players");
const user = require("./routes/user")

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded( { extended: true }));
app.use("/players", playersRouter);
app.use("/user", user)
app.use(bodyParser.json());


app.listen(PORT, function() {
    console.log("Listening on " + PORT);
});

module.exports = app;

// app.post("/home", function (req, res) {
//     console.log(req);
//     // res.send({ name: "mzx" } );
//     res.redirect("/");
// });







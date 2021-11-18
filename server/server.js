
const express = require("express");

const cors = require("cors");

const app = express();

const initRoutes =  require("./routes");

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

require("./routes")(app);


let port = 8080;
app.listen(port, () => {
    console.log(`Running a host on: ${port}`);
})
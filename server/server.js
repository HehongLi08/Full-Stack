
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

const db = require("./models");
db.mongoose.connect(db.url + db.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch( error => {
        console.log(error);
        process.exit();
    });


require("./routes")(app);


let port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Running a host on: ${port}`);
})
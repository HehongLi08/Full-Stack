const express = require('express');
const router = express.Router();
const url = require("url");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mzx", function (err) {
    if (err) {
        console.log("Mongo Error:" + err);
    }
});

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String
});

var userModel = mongoose.model('users', userSchema);



router.post("/", async function (req, res) {
    var reqBody = req.body;

    var query = userModel.find({username: "cl2228"});
    console.log(query);
    // userModel.create({username: reqBody.username, password: reqBody.password }, (err) => {
    //     if (err) console.log("CreateError:" + err);
    //     console.log("created!");
    // })

    res.send(
        "<span>got you!</span>"
    )
});

router.get("/", async function (req, res) {
    var reqBody = req.body;

    var query = await userModel.findOneAndDelete({username: "cl2228"});
    console.log(query);
    // userModel.create({username: reqBody.username, password: reqBody.password }, (err) => {
    //     if (err) console.log("CreateError:" + err);
    //     console.log("created!");
    // })

    res.send(
        query
    )
});

module.exports = router;
const express = require('express');
const router = express.Router();
const url = require("url");
const bodyParser = require('body-parser');

router.get("/", async function (req, res) {

    res.send(
        "<span>got you!</span>"
    )
});

module.exports = router;
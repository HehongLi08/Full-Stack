var express = require("express");
var router = express.Router();

router.get('/', function (req, res) {
    res.send("GET on things");
});
router.get("/", function (req, res) {
    res.send("POST on things");
});

module.exports = router;

module.exports = app => {
    const userControl = require("../controllers/user.controller");

    var router = require("express").Router();

    router.get("/", userControl.create);

    app.use("/users", router);
}
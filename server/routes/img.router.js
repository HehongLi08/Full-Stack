const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const imgController = require("../controllers/img.controller");
const userController = require("../controllers/user.controller");


let routes = function(app) {
    router.get("/list", imgController.getListFiles);
    router.get("/upload", imgController.uploadFiles);
    router.get("/retrieve/:name", imgController.download);
    router.delete("/test/delete", imgController.deleteFile);

    return app.use("/", router);
}

module.exports = routes;
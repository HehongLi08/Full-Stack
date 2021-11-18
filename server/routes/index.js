


const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");
const userController = require("../controllers/user.controller");

let routes = function (app) {
    router.get("/", homeController.getHome);

    router.post("/upload", uploadController.uploadFiles);
    router.get("/files", uploadController.getListFiles);
    router.get("/files/:name", uploadController.download);
    router.delete("/files/test/delete", uploadController.deleteFile);

    router.get("/users", userController.create);


    return app.use("/", router);
}

module.exports = routes;


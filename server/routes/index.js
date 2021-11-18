


const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const imgController = require("../controllers/img.controller");
const userController = require("../controllers/user.controller");

// const imgRoutes = require("./img.router");

let routes = function (app) {

    // the home page, only for front-end visualization of image uploading
    router.get("/", homeController.getHome);

    // https://192.168.0.1/img/upload

    // image uploading routing
    router.get("/img/list", imgController.getListFiles);
    router.post("/img/upload", imgController.uploadFiles);
    router.get("/img/retrieve/:name", imgController.download);
    router.delete("/img/test/delete", imgController.deleteFile);

    // user accounts manipulation routing
    router.get("/user/test", userController.test);
    router.post("/user/create", userController.createUser);
    router.get("/user/inspect", userController.inspectAllUser);
    router.post("/user/edit/:username", userController.editUser);
    router.delete("/user/delete", userController.deleteUser);


    return app.use("/", router);
}

module.exports = routes;


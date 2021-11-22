


const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const imgController = require("../controllers/img.controller");
const userController = require("../controllers/user.controller");
const postController = require("../controllers/post.contoller");
const multer = require("multer");
const path = require("path");

// const imgRoutes = require("./img.router");

let routes = function (app) {

    // the home page, only for front-end visualization of image uploading
    router.get("/", homeController.getHome);


    // image uploading routing
    router.get("/img/list", imgController.getListFiles);
    router.post("/img/upload", imgController.uploadFiles);
    router.get("/img/retrieve/:name", imgController.download);
    router.delete("/img/delete/all", imgController.deleteAllImg);
    router.delete("/img/delete/:name", imgController.deleteOneImg)


    // user accounts manipulation routing
    router.get("/user/test", userController.test);
    router.post("/user/create", userController.createUser);
    router.get("/user/inspect", userController.inspectAllUser);
    router.post("/user/edit/", userController.updateUserPwd);
    router.delete("/user/delete", userController.deleteUser);

    // post manipulation routing
    router.post("/post/test", postController.test);
    router.post("/post/create", postController.createPost);
    router.get("/post/get/all", postController.getAllPosts);
    router.get("/post/get/id/:id", postController.getById);
    router.get("/post/get/title", postController.searchByTitle);
    router.post("/post/update/:id", postController.updatePostById);



    return app.use("/", router);
}

module.exports = routes;


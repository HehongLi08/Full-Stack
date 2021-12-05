


const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const imgController = require("../controllers/img.controller");
const userController = require("../controllers/user.controller");
const postController = require("../controllers/post.contoller");
const jwtMiddleware = require("../middleware/jwtVerify.middleware");
const multer = require("multer");
const path = require("path");
const {getPersonalPage} = require("../controllers/post.contoller");

// const imgRoutes = require("./img.router");

let routes = function (app) {

    // the home page, only for front-end visualization of image uploading
    router.get("/", homeController.getHome);


    /**
     * **************************************************************
     * File Uploading or Deleting routes
     * **************************************************************
     */
    router.post("/img/upload", imgController.uploadFiles);
    router.get("/img/retrieve/:name", imgController.download);
    router.delete("/img/delete/:name", imgController.deleteOneImg);

    // this two functions only for inner tests
    router.get("/img/list", imgController.getListFiles);
    router.delete("/img/delete/all", imgController.deleteAllImg);


    /**
     * **************************************************************
     * User Account routes
     * **************************************************************
     */
    // user accounts manipulation routing
    router.post("/user/signup", userController.createUser);
    router.post("/user/signup/send", userController.signupSendCode);
    router.post("/user/signup/verify", jwtMiddleware.verifyEmailToken, userController.signupVerify)

    router.post("/user/login", userController.loginUser);
    router.post("/user/verify", jwtMiddleware.verifyToken, userController.verifyUser);

    router.post("/user/retrieve/send", userController.retrieveSendCode);
    router.post("/user/retrieve/reset", jwtMiddleware.verifyEmailToken, userController.retrieveResetPassword);

    router.delete("/user/delete", userController.deleteUser);
    router.post("/user/edit/", userController.updateUserPwd);
    router.get("/user/inspect", userController.inspectAllUser);
    router.post("/user/test", userController.test);
    router.delete("/user/delete/all", userController.deleteAll)


    /**
     * **************************************************************
     * Post Account routes
     * **************************************************************
     */
    // post manipulation routing
    router.post("/post/test", postController.test);
    router.post("/post/create", postController.createPost);
    router.get("/post/get/all", postController.getAllPosts);
    router.get("/post/get/id/:id", postController.getById);
    router.get("/post/get/title", postController.searchByTitle);
    router.post("/post/update/:id", postController.updatePostById);
    router.delete("/post/delete/all", postController.deleteAll);
    router.delete("/post/delete/:id", postController.deleteById);


    /**
     * **************************************************************
     * Page routes, used for route for different pages
     * **************************************************************
     */
    router.get("/profile", jwtMiddleware.verifyToken, postController.getPersonalPage)


    return app.use("/", router);
}

module.exports = routes;


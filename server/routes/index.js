


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

    // router.post("/img/posttest", upload.single('test'), function(req, res) {
    //     console.log("multer test called----------------------");
    //     console.log(req.username);
    //     console.log(req.file);
    //
    //     res.status(200).send({
    //         message: "multer test"
    //     })
    // });

    // user accounts manipulation routing
    router.get("/user/test", userController.test);
    router.post("/user/create", userController.createUser);
    router.get("/user/inspect", userController.inspectAllUser);
    router.post("/user/edit/", userController.updateUserPwd);
    router.delete("/user/delete", userController.deleteUser);

    // post manipulation routing
    // router.post("/post/test", postController.test);
    router.post("/post/create", postController.createPost);





    // const storage = multer.memoryStorage();
    const storage = require("../middleware/img.middleware");
    const upload = multer( {storage: storage});
    const cpUpload = upload.fields([{name: "images", maxCount:5}]);
    router.post("/post/test", cpUpload, () => {
        console.log("haha");
    });
    //     , (req, res, next) => {
    //     console.log(req.files);
    //     return res.status(200).send({
    //         message: "post creating test"
    //     });
    // });


    return app.use("/", router);
}

module.exports = routes;


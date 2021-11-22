const upload = require("../middleware/img.middleware");
const imgBaseUrl = require("../config/db.config").imgBaseUrl;

const Post = require("../models/posts.model");
const imgUpload = require("../middleware/img.middleware");
const imgController = require("../controllers/img.controller");

const test = async function (req, res) {
    return res.status(200).send({
        message: "post test"
    });
}

// create a post
const createPost = async function(req, res) {
    try {
        await upload(req, res);

        if (req.files.length < 1) {
            return res.status(400).send({ message: "Must upload at least one image!" });
        }

        if (!req.body.title) {
            let imgNames = [];
            req.files.forEach(d => { imgNames.push(d.filename) });
            let deleted = await imgController.deleteByNames(imgNames);
            return res.status(400).send({ message: "Must have a title", deleted: deleted.deleted });
        }
        if (!req.body.price) {
            let imgNames = [];
            req.files.forEach(d => { imgNames.push(d.filename) });
            let deleted = await imgController.deleteByNames(imgNames);
            return res.status(400).send({ message: "Must have a price", deleted: deleted.deleted });
        }
        if (!req.body.description) {
            let imgNames = [];
            req.files.forEach(d => { imgNames.push(d.filename) });
            let deleted = await imgController.deleteByNames(imgNames);
            return res.status(400).send({ message: "Must have a description", deleted: deleted.deleted });
        }
        if (!req.body.user) {
            let imgNames = [];
            req.files.forEach(d => { imgNames.push(d.filename) });
            let deleted = await imgController.deleteByNames(imgNames);
            return res.status(400).send({ message: "Must have a user", deleted: deleted.deleted });
        }


        let imgUrls = [];
        req.files.forEach( (d, i) => {
            imgUrls.push(imgBaseUrl + d.filename);
        });

        const post = new Post({
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            user: res.body.user,
            images: imgUrls
        })
        await post.save()
            .then( data => {
                res.status(200).send({
                    message: "Successfully Created the post",
                    data: data
                })
            })
            .catch( error => {
                res.status(500).send({
                    message: error.message
                });
            });
    }
    catch (error) {
        console.log(error);

        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).send({
                message: "Too many files to upload"
            });
        }

        return res.send({
            message: `Error occured when uploading: ${error}`
        });
    }
};




module.exports = {
    test,
    createPost
}

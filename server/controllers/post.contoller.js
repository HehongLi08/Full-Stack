const imgBaseUrl = require("../config/config").imgBaseUrl;

const Post = require("../models/posts.model");
const imgUpload = require("../middleware/img.middleware");
const imgController = require("../controllers/img.controller");
const {ObjectId} = require("mongodb");


// pure test---------------------------------
// can write any statement here to test the program
const test = async function (req, res) {
    return res.status(200).send({
        message: "post test"
    });
}


/**
 * ***********************************************************************
 * Helper Functions
 * ***********************************************************************
 */
// a helper function used to delete the already uploaded images whose post is not valid
const deleteNewlyUploadedImages = async function(files) {
    let names = [];
    files.forEach( (f) => { names.push(f.filename); } );
    return await imgController.deleteByNames(names);
}

/**
 * ***********************************************************************
 * Exported Functions
 * ***********************************************************************
 */

// create a post----------------------------------------------------
const createPost = async function(req, res) {
    try {
        await imgUpload(req, res);

        // if the user did not upload any images, should return the message that indicates the bad request
        if (req.files.length < 1) {
            return res.status(400).send({ message: "Must upload at least one image!" });
        }

        // check if any necessary filed is missing
        // a Post Schema has:
        // Title, Price, Description, User, Images
        if (!req.body.title) {
            let deleted = await deleteNewlyUploadedImages(req.files);
            return res.status(400).send({ message: "Must have a title", deleted: deleted.deleted });
        }
        if (!req.body.price) {
            let deleted = await deleteNewlyUploadedImages(req.files);
            return res.status(400).send({ message: "Must have a price", deleted: deleted.deleted });
        }
        if (!req.body.description) {
            let deleted = await deleteNewlyUploadedImages(req.files);
            return res.status(400).send({ message: "Must have a description", deleted: deleted.deleted });
        }
        if (!req.body.user) {
            let deleted = await deleteNewlyUploadedImages(req.files);
            return res.status(400).send({ message: "Must have a user", deleted: deleted.deleted });
        }

        // record the file name of images
        let imgUrls = [];
        req.files.forEach( (d, i) => {
            imgUrls.push(d.filename);
        });

        // the Schema for the new post
        const post = new Post({
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            user: req.body.user,
            images: imgUrls
        });

        // save this post to the database
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

        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).send({
                message: "Too many files to upload"
            });
        }

        return res.send({
            message: `Error occurred when uploading: ${error}`
        });
    }
};


// get all posts----------------------------------------------------
const getAllPosts = async function(req, res) {
    let allPosts = await Post.find();
    return res.status(200).send({
        data: allPosts
    });
}


// get a post by its ID in the database-----------------------------
const getById = async function(req, res) {
    try {
        if (!req.params.id) {
            res.status(400).send({ message: "You must provide the ID of the post!" } );
        }
        // let testID = "619bac99cc93b6258ccb599f";
        let findRes = await Post.find({ _id: req.params.id});
        console.log(findRes);

        if (findRes.length < 1) return res.status(400).send({ message: "No target post found!" });
        return res.status(200).send({
            message: `${findRes.length} record(s) found!`,
            data: findRes
        });
    }
    catch (error) {
        return res.status(500).send({
            message: `Error occurred when retrieving a post: ${error}`
        });
    }
}


// search posts by the title----------------------------------------
const searchByTitle = async function(req, res) {
    try {
        const title = req.query.title;
        let condition = title ? {title: { $regex: new RegExp(title), $options: "i"}}: {};
        let findRes = await Post.find(condition).sort({updatedAt: -1} );

        res.status(200).send(
            {
                message: `${findRes.length} record(s) found.`,
                data: findRes
            }
        );
    }
    catch (error) {
        res.status(500).send( { message: error } );
    }
}


// update a post, using its unique ObjectID-------------------------
const updatePostById = async function(req, res) {
    try {
        await imgUpload(req, res);

        if (req.files.length < 1) {
            return res.status(400).send({
                message: "Must upload at lease one image!"
            });
        }

        // if any of the necessary field is not provided, delete the new uploaded images
        if (!req.params.id) {
            let deleted = await deleteNewlyUploadedImages(req.files);
            return res.status(400).send(
                {
                    message: "Must provide the ID of the original post",
                    deleted: deleted.deleted
                });
        }

        // if the old post does not exist, which means that we cannot update it
        let findRes = await Post.find( {_id: req.params.id} );
        if (findRes.length < 1) {
            let deleted = await deleteNewlyUploadedImages(req.files);
            return res.status(400).send( {
                message: "No post found, maybe you should create a new one!",
                deleted: deleted.deleted
            });
        }

        // check if any necessary filed is missing
        // a Post Schema has:
        // Title, Price, Description, User, Images
        if (!req.body.title) {
            let deleted = await deleteNewlyUploadedImages(req.files);
            return res.status(400).send({ message: "Must have a title", deleted: deleted.deleted });
        }
        if (!req.body.price) {
            let deleted = await deleteNewlyUploadedImages(req.files);
            return res.status(400).send({ message: "Must have a price", deleted: deleted.deleted });
        }
        if (!req.body.description) {
            let deleted = await deleteNewlyUploadedImages(req.files);
            return res.status(400).send({ message: "Must have a description", deleted: deleted.deleted });
        }
        if (!req.body.user) {
            let deleted = await deleteNewlyUploadedImages(req.files);
            return res.status(400).send({ message: "Must have a user", deleted: deleted.deleted });
        }

        // delete the old images in the old post
        let deletedOldImg = await imgController.deleteByNames(findRes[0].images);


        let imgUrls = [];
        req.files.forEach( (d, i) => {
            imgUrls.push(d.filename);
        });

        // the Schema for the new post
        const newVal = {
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            user: req.body.user,
            images: imgUrls
        };

        console.log(newVal);

        let updated = await Post.findOneAndUpdate({_id: req.params.id}, newVal, {new: true});

        res.status(200).send({
            message: "Successfully updated!",
            updated: updated,
            deletedImg: deletedOldImg
        });
    }
    catch (error) {

        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).send({
                message: "Too many files to upload"
            });
        }

        res.status(500).send( {message: error } );
    }
}


// delete a post by provided ID-------------------------------------
const deleteById = async function(req, res) {
    try {
        if (!req.params.id) {
            return res.status(400).send({ message: "Must provide the post ID!" });
        }

        let findRes = await Post.find( {_id: req.params.id} );
        for (let p of findRes) {
            await imgController.deleteByNames(p.images);
        }
        for (let p of findRes) {
            await Post.deleteMany({_id: req.params.id});
        }

        res.status(200).send({
            message: `${findRes.length} post(s) deleted!`
        });
    }
    catch (error) {
        res.status(500).send({
            message: error
        });
    }
}


// delete ALL posts [A DEVEL PROGRAM, JUST FOR TEST]----------------
const deleteAll = async function(req, res) {
    try {
        let allPosts = await Post.find();
        let imgList = [];
        allPosts.forEach(p => {
            p.images.forEach(img => imgList.push(img));
        });
        let imgDeleted = await imgController.deleteByNames(imgList);
        await Post.deleteMany({});
        res.status(200).send({
            message: `${allPosts.length} post(s) deleted!`,
            deletedImg: imgDeleted
        });
    }
    catch (error) {
        res.status(500).send({
            message: error
        });
    }
}


//*******************************************************************************
// export the module functions
module.exports = {
    test,
    createPost,
    getAllPosts,
    getById,
    searchByTitle,
    updatePostById,
    deleteById,
    deleteAll
}

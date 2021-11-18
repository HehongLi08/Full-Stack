const upload = require("../middleware/img.middleware");
const dbConfig = require("../config/db.config");

const {ObjectId} = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;

const url = dbConfig.url;


const mongoClient = new MongoClient(url);

// upload files, note that this function will be need for user system
const uploadFiles = async function (req, res) {
    try {
        // use the middleware to upload the file
        await upload(req, res);
        console.log("tag");
        console.log(req.files[0]);

        if (req.files.length <= 0) {
            return res.status(400).send({
                message: "You must select a file.",
            })
        }

        return res.status(200).send({
            message: "File has been uploaded.",
        });
    }
    catch (error) {
        console.log(error);

        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).send({
                message: "Too many files to upload.",
            });
        }

        return res.send({
            message: `Error occurred when uploading: ${error}`
        });
    }
};


const getListFiles = async function (req, res) {
    console.log("getListFiles...");
    // console.log(req.body);
    try {
        await mongoClient.connect();

        const database = mongoClient.db(dbConfig.database);
        const images = database.collection(dbConfig.imgBucket + ".files");

        const cursor = images.find({});
        if ((await cursor.count()) === 0) {
            return res.status(500).send({
                message: "No files found!",
            });
        }

        let fileInfos = [];
        await cursor.forEach((doc) => {
            fileInfos.push({
                name: doc.filename,
                url: dbConfig.imgBaseUrl + doc.filename
            });
        });
        return res.status(200).send(fileInfos);
    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
};

const download = async function (req, res) {
    console.log(req);
    try {
        await mongoClient.connect();

        const database = mongoClient.db(dbConfig.database);
        const bucket = new GridFSBucket(database, {
            bucketName: dbConfig.imgBucket,
        });

        let downloadStream = bucket.openDownloadStreamByName(req.params.name);

        downloadStream.on("data", function (data) {
            // console.log(data);
            return res.status(200).write(data);
        });

        downloadStream.on("error", function (err) {
            return res.status(404).send( {message: "Cannot download the Image!"});
        });

        downloadStream.on("end", () => {
            return res.end();
        });
    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
};

const deleteFile = async function (req, res) {
    try {

        // get the name of the target file to be deleted
        const n = req.body.name;

        // connect the mongodb and get the collection
        await mongoClient.connect();
        const database = mongoClient.db(dbConfig.database);
        const imgNameCollection = database.collection(dbConfig.imgBucket + ".files");

        // a cursor is a promise, which we need await to handle
        const cursor = imgNameCollection.find();        // delete all test

        // the count of the cursor
        console.log(await cursor.count());

        var imgObjectID = [];
        await cursor.forEach( (d) => {
            console.log(d._id.toHexString());               // the ObjectID of the target
            imgObjectID.push(d._id);
        })

        console.log(imgObjectID.length);
        console.log(imgObjectID);

        const imgChunkCollection = database.collection(dbConfig.imgBucket + ".chunks");

        let deleted = [];

        await imgObjectID.forEach( (d, i) => {
            // let chunkCursor = imgChunkCollection.find({files_id: d});
            imgNameCollection.deleteMany({_id: d}, () => {
                console.log(`Image title with Object ID ${d.toHexString()} has been deleted!`);
            });
            imgChunkCollection.deleteMany({files_id: d}, () => {
                console.log(`Image Chunk with ObjectID ${d.toHexString()} has been deleted!`);
            });
            deleted.push(d.toHexString());
        })


        // const chunkCursor = imgChunkCollection.find({files_id: imgObjectID[0]._id});


        // await imgNameCollection.deleteMany({_id: new ObjectId("6191419796e4682b10313adc")}, () => {
        //     console.log("img title deleted");
        // })
        //
        // await imgChunkCollection.deleteMany({files_id: imgObjectID[0]._id}, () => {
        //     console.log("img chunk deleted");
        // })

        // console.log("tag  " + await chunkCursor.count());

        return res.status(200).send({
            message: "delete test",
            deleted: deleted
        });
    }
    catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
}

const test = async function (req, res) {
    res.status(200).send({
        message: "tst"
    });
}

module.exports = {
    uploadFiles,
    getListFiles,
    download,
    deleteFile,
    test
};
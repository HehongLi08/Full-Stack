const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.database = dbConfig.database;
db.uesr = require("./users.model");
db.imgBucket = dbConfig.imgBucket;
db.imgBaseUrl = dbConfig.imgBaseUrl;

module.exports = db;

const dbConfig = require("../config/db");

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;


var schema = new mongoose.Schema({
        name: String,
        posts: [String]
    }
)
schema.method("toJSON", function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

const Users = mongoose.model("users", schema);

module.exports = Users;
const dbConfig = require("../config/config");
const {ObjectId} = require("mongodb");

const mongoose = require("mongoose");

// use global promise so that it doesn't need to connect to the database everytime
mongoose.Promise = global.Promise;


var schema = new mongoose.Schema({
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }
)
// schema.method("toJSON", function() {
//     const {__v, _id, ...object} = this.toObject();
//     object.id = _id;
//     return object;
// });

const User = mongoose.model("users", schema);

module.exports = User;
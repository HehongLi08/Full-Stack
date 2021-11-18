
const User = require("../models/users.model");


exports.create = (req, res) => {
    console.log(req);

    res.send({ message: "test" });
}

// const create = function(req, res) {
//     console.log("creating a user...");
//     console.log(req.params);
//     console.log(req.body);
//     if (!req.body.name) {
//         res.status(400).send({ message: "Must include a username!" });
//         return;
//     }
//
//     const user = new User({
//         name: req.body.name,
//         posts: []
//     });
//
//     user.save(user)
//         .then( data => {
//             console.log(`user ${data} created!`);
//             res.send(data);
//         })
//         .catch( err => {
//             res.status(500).send({
//                 message: err.message
//             });
//         });
// };
//
// const deletePost = async function(req, res) {
//
// }
//
//
// const addPost = async function(req, res) {
//
// }
//
// module.exports = {
//     create,
//     deletePost,
//     addPost
// }
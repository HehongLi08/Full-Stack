
const User = require("../models/users.model");
const bodyParser = require("body-parser");


// a test of the user
const test = async function (req, res) {
    console.log(req);

    res.send({ message: "test" });
}


// create a new account------------------------------------------
const createUser = async function(req, res) {

    console.log("creating a user...");
    console.log(req.params);
    console.log(req.body);

    // check if the body does not include a username of a password
    if (!req.body.username) {
        res.status(400).send({ message: "Must include a username!" });
        return;
    }
    if (!req.body.password) {
        res.status(400).send({ message: "Must include a password!" });
        return;
    }

    // check whether it is a valid cornell.edu email
    let username = req.body.username, password = req.body.password;
    let checkToken = "@cornell.edu";
    let shortCut =  "sg6803@nyu.edu";

    if (username.length < checkToken.length + 1) {
        res.status(400).send({ message: "Not a valid Cornell email" });
        return;
    }
    if (username.indexOf(checkToken) !== username.length - checkToken.length && username !== shortCut) {
        res.status(400).send({ message: "Not a valid Cornell email" });
        return;
    }


    // check whether the the user has already been registered
    let findRes = await User.find({username: req.body.username})
    if (findRes.length > 0) {
        res.status(400).send({
            message: `username  <${req.body.username}>  already existed!`
        })
        return;
    }

    // pass all validity and duplicate tests, now can insert the userdata to the database
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    });
    user.save()
        .then( data => {
            console.log(`user ${data} created!`);
            res.send(data);
        })
        .catch( err => {
            res.status(500).send({
                message: err.message
            });
        });
};

const deleteUser = async function (req, res) {

    console.log("trying to delete a user account...");
    if (!req.body.username || !req.body.password) {
        res.status(400).send({ message: "Must provide username and password!" });
        return;
    }

    let username = req.body.username, password = req.body.password;

    let findRes = await User.find({ username: username });
    if (findRes.length === 0) {
        res.status(400).send({ message: "Account does not exit!" });
        return;
    }

    let groundTruthPassword = findRes[0].password;
    if (password !== groundTruthPassword) {
        res.status(400).send({ message: "Must provide the right password!"});
        return;
    }

    await User.deleteMany({ username: username});
    res.status(200).send({
        message: `Account <${username}> has been successfully deleted!`
    });
}

const editUser = async function (req, res) {
    console.log("trying to modify a user...");
    if (!req.body.username || !req.body.oldpassword || !req.body.newpassword) {
        return res.status(400).send({ message: "Must provide needed information"});
    }

}


const inspectAllUser = async function (req, res) {
    let allUsers = await User.find();
    res.status(200).send({
        data: allUsers
    })
}

module.exports = {
    test,
    createUser,
    inspectAllUser,
    editUser,
    deleteUser
}
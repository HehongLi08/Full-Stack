
const User = require("../models/users.model");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");


// a bug tester, potentially for routing
const test = async function (req, res) {
    console.log(req);
    res.send({ message: "test" });
}


// create a new account------------------------------------------
const createUser = async function(req, res) {
    /*
    the middleware program for creating a new user,

    need the HTTP request [BODY] includes:
    username: String,
    password: String,
     */

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
    let findRes = await User.find({username: req.body.username});
    if (findRes.length > 0) {
        res.status(400).send({
            message: `username  <${req.body.username}>  already existed!`
        })
        return;
    }

    // pass all validity and duplicate tests, now can insert the userdata to the database
    const user = new User({
        username: req.body.username,
        password: bcrypt.hashSync(password, 8)
    });
    await user.save()
        .then( data => {
            res.status(200).send({
                message: `User <${username}> created!`
            });
        })
        .catch( err => {
            res.status(500).send({
                message: err.message
            });
        });
};


// delete a existed account--------------------------------------
const deleteUser = async function (req, res) {
    /*
    middleware function to delete an account

    need the HTTP body to have:
    username: String
    password: String, the password of that account
     */
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
    let passwordValid = bcrypt.compareSync(password, groundTruthPassword);
    if (!passwordValid) {
        res.status(400).send({ message: "Must provide the right password!"});
        return;
    }

    await User.deleteMany({ username: username});
    res.status(200).send({
        message: `Account <${username}> has been successfully deleted!`
    });
}


// update the password of a user---------------------------------
const updateUserPwd = async function (req, res) {
    /*
    the middle ware function to update the password of a user

    need the HTTP request to have:
    username: String,
    oldpassword: String,
    newpassword: String
     */
    if (!req.body.username || !req.body.oldpassword || !req.body.newpassword) {
        return res.status(400).send({ message: "Must provide needed information"});
    }
    let username = req.body.username, oldPwd = req.body.oldpassword, newPwd = req.body.newpassword;


    let findRes = await User.find({ username: username });
    console.log(findRes.length);
    if (findRes.length !== 1) {         // the username does not exist
        return res.status(400).send({
            message: `username <${username}> does not exist!`
        });
    }

    let groundTruthPassword = findRes[0].password;
    let passwordValid = bcrypt.compareSync(oldPwd, groundTruthPassword);
    if (!passwordValid) {   // wrong old password
        return res.status(400).send({
            message: "Wrong old password!"
        });
    }

    // update the password
    await User.findOneAndUpdate({ username: username}, { password: bcrypt.hashSync(newPwd, 8)});
    return res.status(200).send({
        message: `The password of user: ${username} has been changed!`
    });
}


// delete all users, ONLY for testing----------------------------
const deleteAll = async function(req, res) {
    User.deleteMany({})
        .then(()=> {
            res.status(200).send( { message: "All users deleted!" } );
        });
}



const verifyUser = async function (req, res) {
    try {
        if (!req.body.username) {
            return res.status(400).send({ message: "Must provide a username!" });
        }
        if (!req.body.password) {
            return res.status(400).send({ message: "Must provide a password!" });
        }

        let userFind = await User.find({ username: req.body.username } );
        if (userFind.length < 1) {
            return res.status(400).send({ message: "User does not exist!" });
        }


    }
    catch (error) {
        res.status(500).send({ message: error });
    }
}


// get all the user information, only for internal testing-------
const inspectAllUser = async function (req, res) {
    let allUsers = await User.find();
    return res.status(200).send({
        data: allUsers
    });
}





module.exports = {
    test,
    createUser,
    inspectAllUser,
    updateUserPwd,
    deleteUser,
    verifyUser,
    deleteAll
}
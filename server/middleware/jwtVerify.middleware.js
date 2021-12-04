const jwt = require("jsonwebtoken");
const Config = require("../config/config");


const verifyToken = function (req, res, next) {

    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send( {message: "No token provided" } );
    }

    jwt.verify(token, Config.secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).send( {message: "Unauthorized, you need to login again!"} );
        }
        req.userId = decoded.id;
        next();
    });
}


const verifyEmailToken = function (req, res ,next) {

    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send( { message: "Please enter your verification code!" } );
    }

    jwt.verify(token, Config.secretKey, (err, decoded) => {
       if (err) {
            return res.status(403).send( {message: "Wrong Verification code!" });
       }

       console.log(decoded);

       req.username = decoded.username;
       next();
    });
}

module.exports = {
    verifyToken,
    verifyEmailToken
}
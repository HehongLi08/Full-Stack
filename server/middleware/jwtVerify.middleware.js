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


module.exports = {
    verifyToken
}
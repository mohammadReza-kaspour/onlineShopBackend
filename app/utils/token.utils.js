const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("./constants.utils");

const signAccessToken = (payload) => {
    return jwt.sign(payload , ACCESS_TOKEN_SECRET , {
        expiresIn : 60*60*24*7,
    })
}

const verifyAccessToken = (token) => {
    return jwt.verify(token , ACCESS_TOKEN_SECRET , (error , decode) => {
        if(error) return null;
        return decode;
    });
}

module.exports = {
    signAccessToken,
    verifyAccessToken,
}
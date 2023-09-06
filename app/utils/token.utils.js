const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET , ACCESS_TOKEN_EXPIRE , REFRESH_TOKEN_EXPIRE } = require("./constants.utils");

const signAccessToken = (payload) => {
    return jwt.sign(payload , ACCESS_TOKEN_SECRET , {
        expiresIn : ACCESS_TOKEN_EXPIRE,
    })
}

const verifyAccessToken = (token) => {
    return jwt.verify(token , ACCESS_TOKEN_SECRET , (error , decode) => {
        if(error) return null;
        return decode;
    });
}

const signRefreshToken = (payload) => {
    return jwt.sign(payload , REFRESH_TOKEN_SECRET , {
        expiresIn : REFRESH_TOKEN_EXPIRE,
    })
}

const verifyRefreshToken = (token) => {
    return jwt.verify(token , REFRESH_TOKEN_SECRET , (error , decode) => {
        if(error) return null;
        return decode;
    })
}

module.exports = {
    signAccessToken,
    verifyAccessToken,
    signRefreshToken,
    verifyRefreshToken,
}
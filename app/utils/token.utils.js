const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET , ACCESS_TOKEN_EXPIRE , REFRESH_TOKEN_EXPIRE } = require("./constants.utils");
const { redisClient } = require("./initRedis.utils");

const signAccessToken = (payload) => {
    return jwt.sign(payload , ACCESS_TOKEN_SECRET , {
        expiresIn : ACCESS_TOKEN_EXPIRE
    })
}

const verifyAccessToken = (token) => {
    return jwt.verify(token , ACCESS_TOKEN_SECRET , (error , decode) => {
        if(error) return null;
        return decode;
    });
}

const signRefreshToken = (payload) => {
    return new Promise((resolve , reject) => {
        jwt.sign(payload , REFRESH_TOKEN_SECRET , {expiresIn : REFRESH_TOKEN_EXPIRE,} , async (error , token) => {
            if(error) reject(null);
            await redisClient.SETEX(payload.mobile , 365*24*60*60 , token);
            resolve(token)
        })
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
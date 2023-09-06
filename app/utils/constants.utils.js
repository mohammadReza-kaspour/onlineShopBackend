const md5 = require("md5");

module.exports = {
    OTP_EXPIRE : Date.now() + 120000, //2min
    ACCESS_TOKEN_SECRET : md5("mohammad"),
    ACCESS_TOKEN_EXPIRE : 60*2,
    REFRESH_TOKEN_SECRET : md5("mohammad2"),
    REFRESH_TOKEN_EXPIRE : "1y",
}
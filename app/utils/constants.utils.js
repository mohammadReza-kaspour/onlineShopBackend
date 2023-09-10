const md5 = require("md5");

module.exports = {
    OTP_EXPIRE : () => Date.now() + 120000, //2min
    ACCESS_TOKEN_SECRET : md5("mohammad"),
    ACCESS_TOKEN_EXPIRE : "1w",
    REFRESH_TOKEN_SECRET : md5("mohammad2"),
    REFRESH_TOKEN_EXPIRE : "1y",
    ROLES : {
        USER : "USER",
        ADMIN : "ADMIN",
        WRITER : "WRITER",
        TEACHER : "TEACHER",
        SUPPLIER : "SUPPLIER",
    },
    VALID_IMAGE_UPLOAD_FORMATS : [".jpg" , ".jpeg" , ".webp" , ".png"],
    MAX_IMAGE_UPLOAD_SIZE : 2*1000*1000, //byte
    
}
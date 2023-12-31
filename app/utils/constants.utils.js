const md5 = require("md5");

module.exports = {
    PORT : 3000,
    BASE_URL : "http://localhost",
    OTP_EXPIRE : () => Date.now() + 120000, //2min
    ACCESS_TOKEN_SECRET : md5("mohammad"),
    ACCESS_TOKEN_EXPIRE : "3m",
    REFRESH_TOKEN_SECRET : md5("mohammad2"),
    REFRESH_TOKEN_EXPIRE : "1y",

    ROLES : Object.freeze({
        SUPER_USER : "SUPER_USER",
        ADMIN : "ADMIN",
        CONTENT_MANAGER : "CONTENT_MANAGER",
        SUPPLIER : "SUPPLIER",
        TEACHER : "TEACHER",
        USER : "USER",
    }),
    PERMISSIONS : Object.freeze({
        SUPER_USER : ["super-user"],
        ADMIN : ["course","blog","category","product","profile"],
        CONTENT_MANAGER : ["course","blog","category","product"],
        SUPPLIER : ["product"],
        TEACHER : ["course","blog"],
        USER : ["profile"],
    }),

    VALID_IMAGE_UPLOAD_FORMATS : [".jpg" , ".jpeg" , ".webp" , ".png"],
    MAX_IMAGE_UPLOAD_SIZE : 2*1000*1000, //byte

    VALID_VIDEO_UPLOAD_FORMATS : [".mp4" , ".mkv" , ".avi" , ".mpg" , ".mov"],
    MAX_VIDEO_UPLOAD_SIZE : 300*1000*1000, //byte

    MY_LONGTERM_TOKEN : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTExOTQ2MTU2OCIsImlhdCI6MTY5NDQ2NDE3MSwiZXhwIjoxNzI2MDIxNzcxfQ.-E1L2O1E5P8G6Lt_aI7lDxYO8peAJOrYAWy13heK8A4",

    PAYMENT_CONSTANTS : {
        merchant_id : "e991b525-0a24-44e5-9f7b-a71b004bbac7",
    }
    
}
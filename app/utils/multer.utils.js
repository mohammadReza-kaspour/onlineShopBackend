const multer = require("multer");
const fs = require("fs");
const path = require("path")

const createUploadPathForMulter = () => {
    const date = new Date();
    const {y , m , d} = {y:date.getFullYear() , m:date.getMonth()+1 , d:date.getDate()};
    const uploadPath = `./public/uploads/${y}/${m}/${d}`;
    fs.mkdirSync(uploadPath , {recursive : true});
    return uploadPath;
}

const storage = multer.diskStorage({
    destination: (req , file , cb) => {
        cb(null , createUploadPathForMulter());
    },
    filename: (req , file , cb) => {
        const ext = path.extname(file.originalname);
        const fileName = `${Date.now()}${ext}`;
        cb(null , fileName);
    },
})

const uploadFile = multer({storage});

module.exports = {
    uploadFile,
}
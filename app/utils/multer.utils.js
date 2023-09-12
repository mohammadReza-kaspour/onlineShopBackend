const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { createError } = require("./functions.utils");
const { VALID_IMAGE_UPLOAD_FORMATS, MAX_IMAGE_UPLOAD_SIZE } = require("./constants.utils");

const createUploadPathForMulter = () => {
    const date = new Date();
    const {y , m , d} = {y:date.getFullYear() , m:date.getMonth()+1 , d:date.getDate()};
    const uploadPath = `./public/uploads/${y}/${m}/${d}`;
    fs.mkdirSync(uploadPath , {recursive : true});
    return uploadPath;
}

const deleteJunkFilesAfterBreakUploading = (files) => {
    if(Array.isArray(files) && files.length > 0){
        console.log(files);
        files.forEach(item => fs.unlinkSync(item.path))
    }else{
        fs.unlinkSync(files.path)
    }
}

const fileFilter = (req,file,cb) => {
    if(!file?.originalname) return cb(null , null);
    const ext = path.extname(file.originalname);
    if(!VALID_IMAGE_UPLOAD_FORMATS.includes(ext)){
        return cb(createError(400 , "فرمت فایل ارسال شده صحیح نمیباشد"));
    }
    return cb(null , true);
}

const storage = multer.diskStorage({
    destination: (req , file , cb) => {
        if(!file?.originalname) return cb(null , null);
        cb(null , createUploadPathForMulter());
    },
    filename: (req , file , cb) => {
        if(!file?.originalname) return cb(null , null);
        const ext = path.extname(file.originalname);
        const fileName = `${Date.now()}${ext}`;
        cb(null , fileName);
    },
})

const uploadFile = multer({storage, fileFilter , limits : {fileSize:MAX_IMAGE_UPLOAD_SIZE}});

module.exports = {
    uploadFile,
    deleteJunkFilesAfterBreakUploading,
}
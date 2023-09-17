const { body, param } = require("express-validator");
const { VALID_VIDEO_UPLOAD_FORMATS, MAX_VIDEO_UPLOAD_SIZE } = require("../../../utils/constants.utils");
const path = require("path")

const justMongoIDValidator = () => [
    param("id").isMongoId().withMessage("شناسه محصول وارد شده مجاز نمیباشد"),
]

const addEpisodeValidation = () => [
    param("chapterid").isMongoId().withMessage("شناسه محصول وارد شده مجاز نمیباشد"),
    body("title").trim().isLength({min:1 , max:50}).withMessage("عنوان اپیزود باید بین 1 تا 50 کارکتر باشد"),
    body("text").trim().isLength({min:1}).withMessage("توضیحات اپیزود نمی تواند خالی باشد"),
    body("type").custom((value , {req}) => {
        const validData = ["free" , "cash" , "vip"];
        if(!validData.includes(value)) throw "نوع اپیزود باید یکی از مقادیر رایگان،پولی یاویژه باشد"

        return true
    }),
    body("video").custom((value , {req}) => {
        if(!!value){
            const {file} = req;
            if(!VALID_VIDEO_UPLOAD_FORMATS.includes(path.extname(file.path))){
                throw "فرمت فایل آپلود شده مجاز نمیباشد";
            }
            if(MAX_VIDEO_UPLOAD_SIZE < file.size){
                throw `حداکثر حجم تصویر باید ${MAX_VIDEO_UPLOAD_SIZE} مگابایت باشد.`;
            }
        }

        return true;
    }),
]

module.exports = {
    justMongoIDValidator,
    addEpisodeValidation,
}
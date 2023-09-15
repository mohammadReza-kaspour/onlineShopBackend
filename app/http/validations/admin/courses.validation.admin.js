const { body, param } = require("express-validator");
const { default: mongoose } = require("mongoose");
const { VALID_IMAGE_UPLOAD_FORMATS, MAX_IMAGE_UPLOAD_SIZE } = require("../../../utils/constants.utils");
const path = require("path");

const addCourseValidation = () => [
    body("title").isLength({min:2 , max:50}).withMessage("عنوان دوره باید بین 2 تا 50 کارکتر باشد"),
    body("short_desc").isLength({min:10}).withMessage("توضیح کوتاه دوره باید حداقل 10 کارکتر باشد"),
    body("total_desc").isLength({min:10}).withMessage("توضیح کامل دوره باید حداقل 10 کارکتر باشد"),
    body("category").isLength({min:1}).custom((value , {req}) => {
        value.forEach(item => {
            if(!mongoose.isValidObjectId(item)){
                throw `${item}`+"  "+"یک شناسه صحیح نمیباشد";
            }
        })
        return true;
    }),
    body("price").custom((value , {req}) => {
        const regex = /^[0-9]+.*[0-9]+$/gmi;
        if(!regex.test(value)) throw "ووردی قیمت باید به صورت یک عدد صحیح یا اعشاری باشد";
        if(!!Number(value) && req.body.type === "free") throw "دوره رایگان نمیتواند دارای قیمت بیشتر از صفر باشد"
        
        return true
    }),
    body("discount").custom((value , {req}) => {
        const regex = /^[0-9]+$/gmi;
        if(!regex.test(value)) throw "ووردی تخفیف باید به صورت یک عدد صحیح باشد";
        
        return true
    }),
    body("images").custom((value , {req}) => {
        if(!!value){
            const {files} = req;
            files.forEach(file => {
                if(!VALID_IMAGE_UPLOAD_FORMATS.includes(path.extname(file.path))){
                    throw "فرمت فایل آپلود شده مجاز نمیباشد";
                }
                if(MAX_IMAGE_UPLOAD_SIZE < file.size){
                    throw `حداکثر حجم تصویر باید ${MAX_IMAGE_UPLOAD_SIZE} مگابایت باشد.`;
                }
            })
        }


        return true;
    }),
    body("weight").custom((value , {req}) => {
        if(!!value){
            const regex = /^[0-9]+.{1}[0-9]+$/gmi;
            if(!regex.test(value)) throw "ووردی وزن باید به صورت یک عدد صحیح یا اعشاری باشد";
        }
        
        return true
    }),
    body("type").custom((value , {req}) => {
        const validData = ["free" , "cash" , "vip"]
        if(!validData.includes(value)) throw "نوع دوره باید رایگان،پولی یا ویژه باشد"

        return true
    }),
]

const justMongoIDValidator = () => [
    param("id").isMongoId().withMessage("شناسه محصول وارد شده مجاز نمیباشد"),
]

const addChapterValidation = () => [
    param("id").isMongoId().withMessage("شناسه محصول وارد شده مجاز نمیباشد"),
    body("title").trim().isLength({min:1 , max:50}).withMessage("عنوان چپتر باید بین 1 تا 50 کارکتر باشد"),
    body("text").trim().isLength({min:1}).withMessage("توضیحات چپتر نمی تواند خالی باشد"),
]

module.exports = {
    addCourseValidation,
    justMongoIDValidator,
    addChapterValidation,
}
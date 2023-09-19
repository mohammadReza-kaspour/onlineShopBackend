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
        if(!!value && req?.files?.length > 0){
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
    body("type").custom((value , {req}) => {
        const validData = ["free" , "cash" , "vip"]
        if(!validData.includes(value)) throw "نوع دوره باید رایگان،پولی یا ویژه باشد"

        return true
    }),
]

const justMongoIDValidator = () => [
    param("id").isMongoId().withMessage("شناسه محصول وارد شده مجاز نمیباشد"),
]

const updateCourseValidation = (fieldName) => [
    param(fieldName).isMongoId().withMessage("شناسه محصول وارد شده مجاز نمیباشد"),
    body("title").custom((value , {req}) => {
        if(!!value){
            if(value.trim().length <= 2) throw "عنوان باید حداقل 2 و حداکثر 50 کارکتر باشد"
        }
        return true
    }),
    body("short_desc").custom((value , {req}) => {
        if(!!value){
            if(value.trim().length <= 10) throw "توضیحات کوتاه باید حداقل 10 کارکتر باشد"
        }
        return true
    }),
    body("total_desc").custom((value , {req}) => {
        if(!!value){
            if(value.trim().length <= 10) throw "توضیحات کامل باید حداقل 10 کارکتر باشد"
        }
        return true
    }),
    body("category").isLength({min:1}).custom((value , {req}) => {
        if(!!value){
            value.forEach(item => {
                if(!mongoose.isValidObjectId(item)){
                    throw `${item}`+"  "+"یک شناسه صحیح نمیباشد";
                }
            })
        }
        return true;
    }),
    body("price").custom((value , {req}) => {
        if(!!value){
            const regex = /^[0-9]+.*[0-9]+$/gmi;
            if(!regex.test(value)) throw "ووردی قیمت باید به صورت یک عدد صحیح یا اعشاری باشد";
            if(!!Number(value) && req.body.type === "free") throw "دوره رایگان نمیتواند دارای قیمت بیشتر از صفر باشد"
        }
        
        return true
    }),
    body("discount").custom((value , {req}) => {
        if(!!value){
            const regex = /^[0-9]+$/gmi;
            if(!regex.test(value)) throw "ووردی تخفیف باید به صورت یک عدد صحیح باشد";
        }
        
        return true
    }),
    body("images").custom((value , {req}) => {
        if(!!value && req?.files?.length > 0){
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
    body("type").custom((value , {req}) => {
        if(!!value){
            const validData = ["free" , "cash" , "vip"]
            if(!validData.includes(value)) throw "نوع دوره باید رایگان،پولی یا ویژه باشد"
        }

        return true
    }),
]


module.exports = {
    addCourseValidation,
    justMongoIDValidator,
    updateCourseValidation,
}
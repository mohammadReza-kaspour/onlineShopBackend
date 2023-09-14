const { body, param } = require("express-validator");
const { VALID_IMAGE_UPLOAD_FORMATS, MAX_IMAGE_UPLOAD_SIZE } = require("../../../utils/constants.utils");
const path = require("path");

const addProductValidation = () => [
    body("title").isLength({min:2 , max:50}).withMessage("عنوان محصول باید بین 2 تا 50 کارکتر باشد"),
    body("short_desc").isLength({min:10}).withMessage("توضیح کوتاه محصول باید حداقل 10 کارکتر باشد"),
    body("total_desc").isLength({min:10}).withMessage("توضیح کامل محصول باید حداقل 10 کارکتر باشد"),
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
        
        return true
    }),
    body("discount").custom((value , {req}) => {
        const regex = /^[0-9]+$/gmi;
        if(!regex.test(value)) throw "ووردی تخفیف باید به صورت یک عدد صحیح باشد";
        
        return true
    }),
    body("count").custom((value , {req}) => {
        const regex = /^[0-9]+$/gmi;
        if(!regex.test(value)) throw "ووردی تعداد باید به صورت یک عدد صحیح باشد";
        
        return true
    }),
    body("image").custom((value , {req}) => {
        // {
        //     fieldname: 'image',
        //     originalname: 'chatgpt.txt',
        //     encoding: '7bit',
        //     mimetype: 'text/plain',
        //     destination: './public/uploads/2023/8/9',
        //     filename: '1694211988711.txt',
        //     path: 'public\\uploads\\2023\\8\\9\\1694211988711.txt',
        //     size: 38
        // }
        const {files} = req;
        files.forEach(file => {
            if(!VALID_IMAGE_UPLOAD_FORMATS.includes(path.extname(file.path))){
                throw "فرمت فایل آپلود شده مجاز نمیباشد";
            }
            if(MAX_IMAGE_UPLOAD_SIZE < file.size){
                throw `حداکثر حجم تصویر باید ${MAX_IMAGE_UPLOAD_SIZE} مگابایت باشد.`;
            }
        })


        return true;
    }),
    body("width").custom((value , {req}) => {
        if(!!value){
            const regex = /^[0-9]+.{1}[0-9]+$/gmi;
            if(!regex.test(value)) throw "ووردی عرض باید به صورت یک عدد صحیح یا اعشاری باشد";
        }
        
        return true
    }),
    body("height").custom((value , {req}) => {
        if(!!value){
            const regex = /^[0-9]+.{1}[0-9]+$/gmi;
            if(!regex.test(value)) throw "ووردی ارتفاع باید به صورت یک عدد صحیح یا اعشاری باشد";
        }
        
        return true
    }),
    body("length").custom((value , {req}) => {
        if(!!value){
            const regex = /^[0-9]+.{1}[0-9]+$/gmi;
            if(!regex.test(value)) throw "ووردی طول باید به صورت یک عدد صحیح یا اعشاری باشد";
        }
        
        return true
    }),
    body("weight").custom((value , {req}) => {
        if(!!value){
            const regex = /^[0-9]+.{1}[0-9]+$/gmi;
            if(!regex.test(value)) throw "ووردی وزن باید به صورت یک عدد صحیح یا اعشاری باشد";
        }
        
        return true
    }),
]

const justMongoIDValidator = () => [
    param("id").isMongoId().withMessage("شناسه محصول وارد شده مجاز نمیباشد"),
]

const updateProductValidation = () => [
    param("id").isMongoId().withMessage("شناسه محصول وارد شده مجاز نمیباشد"),
    body("title").isLength({min:0 , max:50}).withMessage("عنوان محصول باید بین 0 تا 50 کارکتر باشد"),
    body("category").isLength({min:0}).custom((value , {req}) => {
        value.forEach(item => {
            if(!mongoose.isValidObjectId(item)){
                throw `${item}`+"  "+"یک شناسه صحیح نمیباشد";
            }
        })
        return true;
    }),
    body("price").custom((value , {req}) => {
        if(!!value){
            const regex = /^[0-9]+.*[0-9]+$/gmi;
            if(!regex.test(value)) throw "ووردی قیمت باید به صورت یک عدد صحیح یا اعشاری باشد";
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
    body("count").custom((value , {req}) => {
        if(!!value){
            const regex = /^[0-9]+$/gmi;
            if(!regex.test(value)) throw "ووردی تعداد باید به صورت یک عدد صحیح باشد";
        }
        
        return true
    }),
    body("image").custom((value , {req}) => {
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
    body("width").custom((value , {req}) => {
        if(!!value){
            const regex = /^[0-9]+.{1}[0-9]+$/gmi;
            if(!regex.test(value)) throw "ووردی عرض باید به صورت یک عدد صحیح یا اعشاری باشد";
        }
        
        return true
    }),
    body("height").custom((value , {req}) => {
        if(!!value){
            const regex = /^[0-9]+.{1}[0-9]+$/gmi;
            if(!regex.test(value)) throw "ووردی ارتفاع باید به صورت یک عدد صحیح یا اعشاری باشد";
        }
        
        return true
    }),
    body("length").custom((value , {req}) => {
        if(!!value){
            const regex = /^[0-9]+.{1}[0-9]+$/gmi;
            if(!regex.test(value)) throw "ووردی طول باید به صورت یک عدد صحیح یا اعشاری باشد";
        }
        
        return true
    }),
    body("weight").custom((value , {req}) => {
        if(!!value){
            const regex = /^[0-9]+.{1}[0-9]+$/gmi;
            if(!regex.test(value)) throw "ووردی وزن باید به صورت یک عدد صحیح یا اعشاری باشد";
        }
        
        return true
    }),
]

module.exports = {
    addProductValidation,
    justMongoIDValidator,
    updateProductValidation
}
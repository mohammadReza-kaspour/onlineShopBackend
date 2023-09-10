const { body, param } = require("express-validator");
const { VALID_IMAGE_UPLOAD_FORMATS, MAX_IMAGE_UPLOAD_SIZE } = require("../../../utils/constants.utils");
const path = require("path");
const { default: mongoose } = require("mongoose");

const createBlogValidation = () => [
    body("title").trim().isLength({min:3 , max:50}).withMessage("عنوان بلاگ باید بین 3 تا 50 کارکتر باشد"),
    body("text").trim().isLength({min:30}).withMessage("بدنه بلاگ نمیتواند خالی باشد و باید حداقل دارای 50 کارکتر باشد"),
    body("categories").isLength({min:1}).withMessage("حداقل یک دسته بندی باید وارد شود").custom((value , {req}) => {
        value.forEach(item => {
            if(!mongoose.isValidObjectId(item)){
                throw `${item}`+"  "+"یک شناسه صحیح نمیباشد";
            }
        })
        return true;
    }),
    body("tags").isLength({min:1}).withMessage("حداقل یک تگ باید وارد شود"),
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
        const {file} = req;

        if(!VALID_IMAGE_UPLOAD_FORMATS.includes(path.extname(file.path))){
            throw "فرمت فایل آپلود شده مجاز نمیباشد";
        }
        if(MAX_IMAGE_UPLOAD_SIZE < file.size){
            throw `حداکثر حجم تصویر باید ${MAX_IMAGE_UPLOAD_SIZE} مگابایت باشد.`;
        }


        return true;
    }),
]

const getBlogByIDValidation = () => [
    param("id").isMongoId().withMessage("شناسه بلاگ وارد شده صحیح نمیباشد")
]

const updateBlogValidation = () => [
    param("id").isMongoId().withMessage("شناسه بلاگ وارد شده صحیح نمیباشد"),
    body("categories").isLength({min:0}).custom((value , {req}) => {
        value.forEach(item => {
            if(!mongoose.isValidObjectId(item)){
                throw `${item}`+"  "+"یک شناسه صحیح نمیباشد";
            }
        })
        return true;
    }),
]

module.exports = {
    createBlogValidation,
    getBlogByIDValidation,
    updateBlogValidation,
}
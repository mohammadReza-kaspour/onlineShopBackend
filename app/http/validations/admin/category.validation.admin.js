const { body, param } = require("express-validator");
const { default: mongoose } = require("mongoose");

const addCategoryValidation = () => [
    body("title").isLength({min:2}).withMessage("عنوان دسته بندی نمیتواند خالی باشد"),
    body("parent").custom((value , {req}) => {
        if(value && value?.length > 0){
            if(mongoose.isValidObjectId(value)) return true;
            else throw "شناسه دسته بندی والد صحیح نمیباشد";
        }
        return true;
    })
]

const getCategoryByIdValidation = () => [
    param("id").isMongoId().withMessage("شناسه ی وارد شده معتبر نمیباشد"),
]

const updateCategoryValidation = () => [
    body("title").notEmpty().withMessage("عنوان دسته بندی نمیتواند خالی باشد"),
    param("id").isMongoId().withMessage("شناسه دسته بندی وارد شده صحیح نمیباشد")
]

module.exports = {
    addCategoryValidation,
    getCategoryByIdValidation,
    updateCategoryValidation,
}
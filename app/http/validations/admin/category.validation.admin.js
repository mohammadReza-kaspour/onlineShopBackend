const { body } = require("express-validator");
const { default: mongoose } = require("mongoose");

addCategoryValidation = () => [
    body("title").isLength({min:2}).withMessage("عنوان دسته بندی نمیتواند خالی باشد"),
    body("parent").custom((value , {req}) => {
        if(value && value?.length > 0){
            if(mongoose.isValidObjectId(value)) return true;
            else throw "شناسه دسته بندی والد صحیح نمیباشد";
        }
        return true;
    })
]

module.exports = {
    addCategoryValidation,
}
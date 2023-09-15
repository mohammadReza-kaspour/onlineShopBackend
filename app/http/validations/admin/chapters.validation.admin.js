const { body, param } = require("express-validator");

const justMongoIDValidator = () => [
    param("id").isMongoId().withMessage("شناسه محصول وارد شده مجاز نمیباشد"),
]

const addChapterValidation = () => [
    param("id").isMongoId().withMessage("شناسه محصول وارد شده مجاز نمیباشد"),
    body("title").trim().isLength({min:1 , max:50}).withMessage("عنوان چپتر باید بین 1 تا 50 کارکتر باشد"),
    body("text").trim().isLength({min:1}).withMessage("توضیحات چپتر نمی تواند خالی باشد"),
]

module.exports = {
    justMongoIDValidator,
    addChapterValidation,
}
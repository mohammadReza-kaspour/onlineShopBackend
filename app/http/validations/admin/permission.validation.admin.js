const { body } = require("express-validator");

const addPermissionValidation = () => [
    body("title").trim().isLength({min:2 , max:30}).withMessage("عنوان دسترسی باید حداقل 2 و حداثر 30 کارکتر باشد"),
    body("description").trim().isLength({min:0 , max:50}).withMessage("توضیحات دسترسی باید حداقل 0 و حداثر 50 کارکتر باشد"),
]

const updatedPermissionValidation = () => [
    body("title").trim().custom((value , {req}) => {
        if(value){
            if(value.length < 2 || value.length > 30) throw "عنوان دسترسی باید حداقل 2 و حداثر 30 کارکتر باشد";
        }
        return true
    }),
    body("description").trim().isLength({min:0 , max:50}).withMessage("توضیحات دسترسی باید حداقل 0 و حداثر 50 کارکتر باشد"),
]

module.exports = {
    addPermissionValidation,
    updatedPermissionValidation,
}
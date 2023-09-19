const { body } = require("express-validator");
const { default: mongoose } = require("mongoose");

const addRoleValidation = () => [
    body("title").trim().isLength({min:2 , max:30}).withMessage("نقش باید حداقل 2 و حداثر 30 کارکتر باشد"),
    body("description").trim().isLength({min:0 , max:250}).withMessage("نقش باید حداقل 0 و حداثر 250 کارکتر باشد"),
    body("permissions").custom((value , {req}) => {
        if(value && value.length > 0){
            for(const item of value){
                if(!mongoose.isValidObjectId(item)) throw `${item} یک شناسه صحیح نمیباشد`
            }
        }
        return true
    })
]

const updateRoleValidation = () => [
    body("title").trim().custom((value , {req}) => {
        if(value){
            if(value.length < 2 || value.length > 30) throw "عنوان نقش باید حداقل 2 و حداثر 30 کارکتر باشد"
        }
        return true
    }),
    body("description").trim().isLength({min:0 , max:250}).withMessage("نقش باید حداقل 0 و حداثر 250 کارکتر باشد"),
    body("permissions").custom((value , {req}) => {
        console.log(value);
        if(value && value.length > 0){
            for(const item of value){
                if(!mongoose.isValidObjectId(item)) throw `${item} یک شناسه صحیح نمیباشد`
            }
        }
        return true
    })
]

module.exports = {
    addRoleValidation,
    updateRoleValidation
}
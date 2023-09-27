const { default: mongoose } = require("mongoose");
const { createError } = require("../../utils/functions.utils");

const checkExistModel = async (model , id) => {
    if(!mongoose.isValidObjectId(id)) throw createError(400 , "شناسه وارد شده صحیح نمیباشد");
    const result = await model.findOne({_id:id});
    if(!result) throw createError(400 , "موردی در دیتابیس یافت نشد");
    return result;
}

module.exports = {
    checkExistModel
}
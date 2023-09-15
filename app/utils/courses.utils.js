const { createError } = require("./functions.utils");
const {StatusCodes} = require("http-status-codes");

const addImageToDataIfExists = (data , req , required = false) => {
    if(req.files.length > 0) data.images = req.files.map(item => item.path);
    if(required && data.images.length <= 0) throw createError(StatusCodes.BAD_REQUEST , "تصویر ارسالی نمیتواند خالی باشد")
    return data
}

module.exports = {
    addImageToDataIfExists,
}
const { StatusCodes } = require("http-status-codes");
const { createError } = require("../../utils/functions.utils");
const { default: mongoose } = require("mongoose");

const checkExistModel = async (model , id) => {
    if(!mongoose.isValidObjectId(id)) throw createError(400 , "شناسه وارد شده صحیح نمیباشد");
    const result = await model.findOne({_id:id});
    if(!result) throw createError(400 , "موردی در دیتابیس یافت نشد");
    return result;
}
const bookmarkHandler = async (targetModel , targetID , user) => {
    let report = createError(StatusCodes.OK , "OK");

    await checkExistModel(targetModel,targetID);
    const fetchedModel = await targetModel.findOne({_id : targetID});

    const bookmarked = !!fetchedModel.bookmarks.find(item => item.toString() === user._id.toString())
    console.log(bookmarked);

    if(bookmarked){
        const result1 = await targetModel.updateOne(
            {_id : targetID},
            {$pull : {bookmarks : user._id}}
        );
        if(result1.modifiedCount <= 0) report = createError(StatusCodes.INTERNAL_SERVER_ERROR , "از علاقه مندی ها حذف نشد");
        else report = createError(StatusCodes.OK , "از علاقه مندی ها حذف شد");
    }else{
        const result1 = await targetModel.updateOne(
            {_id : targetID},
            {$push : {bookmarks : user._id}}
        );
        if(result1.modifiedCount <= 0) report = createError(StatusCodes.INTERNAL_SERVER_ERROR , "به علاقه مندی ها اضافه نشد");
        else report = createError(StatusCodes.OK , "به علاقه مندی ها اضافه شد");
    }

    return report;
}

module.exports = {
    bookmarkHandler,
}
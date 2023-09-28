const { StatusCodes } = require("http-status-codes");
const { createError } = require("../../utils/functions.utils");

const bookmarkHandler = async (targetModel , targetID , user) => {
    let report = createError(StatusCodes.OK , "OK");

    const fetchedModel = await targetModel.findOne({_id : targetID});
    const bookmarked = !!fetchedModel.bookmarks.find(item => item.toString() === user._id.toString())
    console.log(bookmarked);

    if(bookmarked){
        const result1 = await targetModel.updateOne(
            {_id : targetID},
            {$pull : {bookmarks : user._id}}
        );
        if(result1.modifiedCount <= 0) report = createError(StatusCodes.INTERNAL_SERVER_ERROR , "از علاقه مندی ها حذف نشد");
        report = createError(StatusCodes.OK , "از علاقه مندی ها حذف شد");
    }else{
        const result1 = await targetModel.updateOne(
            {_id : targetID},
            {$push : {bookmarks : user._id}}
        );
        if(result1.modifiedCount <= 0) report = createError(StatusCodes.INTERNAL_SERVER_ERROR , "به علاقه مندی ها اضافه نشد");
        report = createError(StatusCodes.OK , "به علاقه مندی ها اضافه شد");
    }

    return report;
}

module.exports = {
    bookmarkHandler,
}
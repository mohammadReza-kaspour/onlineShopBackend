const { default: mongoose } = require("mongoose");
const { createError, badFieldsOrBadValuesFilter } = require("../../utils/functions.utils");
const { commentModel } = require("../../models/comments.model");

const checkExistModel = async (model , id) => {
    if(!mongoose.isValidObjectId(id)) throw createError(400 , "شناسه وارد شده صحیح نمیباشد");
    const result = await model.findOne({_id:id});
    if(!result) throw createError(400 , "موردی در دیتابیس یافت نشد");
    return result;
}
const checkValidParentToReply = async (inputParentID="") => {
    if(!inputParentID) return
    const comment = await commentModel.findOne({_id : inputParentID});
    if(comment.parent) throw createError(400 , "ریپلای کردن برای این کامنت مجاز نمیباشد");
}
const createCommentHandler = async (modelToAddCommentOnIt , comment , targetID , parent , user) => {
    await checkExistModel(modelToAddCommentOnIt,targetID);
    await checkValidParentToReply(parent);

    const commentObject = badFieldsOrBadValuesFilter({
        user : user._id,
        comment : comment,
        section : new mongoose.Types.ObjectId(targetID),
        parent : mongoose.isValidObjectId(parent) ? new mongoose.Types.ObjectId(parent) : undefined,
    } , ["user","comment","parent"]);
    const createdComment = await commentModel.create(commentObject)
    const result = await modelToAddCommentOnIt.updateOne(
        {_id : targetID},
        {$push : {comments : createdComment._id}}
    );
    if(result.modifiedCount <= 0) throw createError(400 , "کامنت افزوده نشد");
}

module.exports = {
    checkExistModel,
    checkValidParentToReply,
    createCommentHandler
}
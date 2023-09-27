const { StatusCodes } = require("http-status-codes");
const { createError } = require("../../utils/functions.utils");

const likeOrDislikeHandler = async (targetModel , targetID , wantToLike , user) => {
    let report = createError(StatusCodes.OK , "OK");
    const fetchedFromModel = await targetModel.findOne({_id : targetID});

    const liked = fetchedFromModel.likes.find(item => item.toString() === user._id.toString()) ? true : false;
    const disliked = fetchedFromModel.dislikes.find(item => item.toString() === user._id.toString()) ? true : false;

    if(wantToLike){

        if(!liked && !disliked){

            const result = await targetModel.updateOne(
                {_id : targetID},
                {$push : {likes : user._id}}
            );
            if(result.modifiedCount <= 0) report = createError(StatusCodes.BAD_REQUEST , "لایک انجام نشد");
            report = createError(StatusCodes.OK , "لایک انجام شد");

        }else if(disliked){

            const resultStep1 = await targetModel.updateOne(
                {_id : targetID},
                {$pull : {dislikes : user._id}}
            );
            if(resultStep1.modifiedCount <= 0) report = createError(StatusCodes.BAD_REQUEST , "لایک انجام نشد");
            const resultStep2 = await targetModel.updateOne(
                {_id : targetID},
                {$push : {likes : user._id}}
            );
            if(resultStep2.modifiedCount <= 0) report = createError(StatusCodes.BAD_REQUEST , "لایک انجام نشد");
            report = createError(StatusCodes.OK , "لایک انجام شد");

        }else if(liked) {
            const result = await targetModel.updateOne(
                {_id : targetID},
                {$pull : {likes : user._id}}
            );
            if(result.modifiedCount <= 0) report = createError(StatusCodes.BAD_REQUEST , "لایک برداشته نشد");
            report = createError(StatusCodes.OK , "لایک برداشته شد");
        }

    }else{
        if(!liked && !disliked){

            const result = await targetModel.updateOne(
                {_id : targetID},
                {$push : {dislikes : user._id}}
            );
            if(result.modifiedCount <= 0) report = createError(StatusCodes.BAD_REQUEST , "دیس لایک انجام نشد");
            report = createError(StatusCodes.OK , "دیس لایک انجام شد");

        }else if(liked){

            const resultStep1 = await targetModel.updateOne(
                {_id : targetID},
                {$pull : {likes : user._id}}
            );
            if(resultStep1.modifiedCount <= 0) report = createError(StatusCodes.BAD_REQUEST , "دیس لایک انجام نشد");
            const resultStep2 = await targetModel.updateOne(
                {_id : targetID},
                {$push : {dislikes : user._id}}
            );
            if(resultStep2.modifiedCount <= 0) report = createError(StatusCodes.BAD_REQUEST , "دیس لایک انجام نشد");
            report = createError(StatusCodes.OK , "دیس لایک انجام شد");
            
        }else if(disliked) {
            const result = await targetModel.updateOne(
                {_id : targetID},
                {$pull : {dislikes : user._id}}
            );
            if(result.modifiedCount <= 0) report = createError(StatusCodes.BAD_REQUEST , "دیس لایک برداشته نشد");
            report = createError(StatusCodes.OK , "دیس لایک برداشته شد");
        }
    }

    return report;
}

module.exports = {
    likeOrDislikeHandler,
}
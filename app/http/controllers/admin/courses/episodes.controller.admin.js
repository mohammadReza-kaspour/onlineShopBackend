const { courseModel } = require("../../../../models/courses.model");
const {StatusCodes} = require("http-status-codes");
const { createError, badFieldsOrBadValuesFilter, copyObject } = require("../../../../utils/functions.utils");
const { default: mongoose } = require("mongoose");
const { getTime } = require("../../../../utils/episodes.utils");
const { default: getVideoDurationInSeconds } = require("get-video-duration");

class AdminEpisodeController{
    addEpisode = async (req , res , next) => {
        try {
            let data = {};
            let videoTime = "00:00:00";

            await getVideoDurationInSeconds(req.file.path)
                .then(duration => videoTime = getTime(duration));

            data = copyObject(req.body)
            data.time = videoTime;
            data.videoAddress = req.file.path;
            const result = await courseModel.updateOne(
                {"chapters._id" : new mongoose.Types.ObjectId(req.params.chapterid),},
                {
                    $push : {"chapters.$.episodes":data}
                }
            );
            if(result.modifiedCount <= 0) createError(StatusCodes.INTERNAL_SERVER_ERROR,"اپیزود ایجاد نشد خطا در سرور");
            
            res.status(StatusCodes.OK).json({
                statusCode : res.statusCode,
                success: true,
                data : {
                    message : "اپیزود با موفقیت ایجاد شد",
                }
            })
        } catch (error) {
            next(error)
        }
    }

    #findCourseById = async (mongoID) => {
        const result = await courseModel.findOne({
            _id : mongoID,
        });
        if(!result) throw createError(StatusCodes.NOT_FOUND , "دوره مورد نظر یافت نشد");
        return result;
    }
    #findChapterById = async (mongoID , projection = {}) => {
        const result = await courseModel.findOne({
            "chapters._id" : mongoID,
        } , projection);
        if(!result) throw createError(StatusCodes.NOT_FOUND , "چپتر مورد نظر یافت نشد");
        return result;
    }
    #findChaptersOfCourse = async (mongoID , projection = {}) => {
        const result = await courseModel.findOne({
            _id : mongoID,
        },projection);
        if(!result) throw createError(StatusCodes.NOT_FOUND , "دوره مورد نظر یافت نشد");
        return result;
    }
}

module.exports = {
    AdminEpisodeController : new AdminEpisodeController(),
}
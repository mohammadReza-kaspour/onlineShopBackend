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
    removeEpisode = async (req , res , next) => {
        try {
            const episodeID = new mongoose.Types.ObjectId(req.params.episodeid)
            await this.#findEpisodeById(episodeID);

            const result = await courseModel.updateOne(
                {"chapters.episodes._id" : episodeID},
                {
                    $pull : {"chapters.$.episodes" : {_id : episodeID}}
                }
            );
            if(result.modifiedCount <= 0) throw createError(StatusCodes.INTERNAL_SERVER_ERROR,"حذف قسمت انجام نشد");
            
            res.status(StatusCodes.OK).json({
                statusCode : res.statusCode,
                success: true,
                data : {
                    message : "اپیزود با موفقیت حذف شد",
                }
            })
        } catch (error) {
            next(error)
        }
    }
    updateEpisode = async (req , res , next) => {
        try {
            //define variables
            let data = {};
            let videoTime = "00:00:00";
            const validFields = ["title","text","type","time","videoAddress",];
            const episodeID = new mongoose.Types.ObjectId(req.params.episodeid);

            //if edit containes video add video data to input data
            data = copyObject(req.body)
            if(req.file && Object.keys(req.file).length > 0){
                console.log("ok");
                await getVideoDurationInSeconds(req.file.path)
                    .then(duration => videoTime = getTime(duration));
                data.time = videoTime;
                data.videoAddress = req.file.path;
            }

            //remove empty fields
            data = badFieldsOrBadValuesFilter(data , validFields);

            //fetch old episode for old data
            const chapter = await this.#findEpisodeById(episodeID , {"chapters.$":1});
            const episodes = chapter.chapters[0].episodes;
            const episode = episodes.filter(item => item._id.equals(episodeID))[0];
            
            validFields.forEach(item => {
                if(!data[item]) data[item] = episode[item]; 
            });

            //put updated package into databse
            const result = await courseModel.updateOne(
                {"chapters.episodes._id" : episodeID},
                {
                    $set : {"chapters.$[].episodes.$[item]" : data}
                },{
                    arrayFilters : [
                        {"item._id" : episodeID}
                    ]
                }
            );
            if(result.modifiedCount <= 0) createError(StatusCodes.INTERNAL_SERVER_ERROR,"اپیزود به روز رسانی نشد");
            
            res.status(StatusCodes.OK).json({
                statusCode : res.statusCode,
                success: true,
                data : {
                    message : "اپیزود با موفقیت به روز رسانی شد",
                }
            })
        } catch (error) {
            next(error)
        }
    }

    test = (req , res , next) => {
        try {
            console.log(req.headers.origin);

            res.send("ok")
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
    #findEpisodeById = async (mongoID , projection={}) => {
        const result = await courseModel.findOne({
            "chapters.episodes._id" : mongoID,
        } , projection);
        if(!result) throw createError(StatusCodes.NOT_FOUND , "اپیزود مورد نظر یافت نشد");
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
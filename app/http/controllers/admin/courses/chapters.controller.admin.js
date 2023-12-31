const { courseModel } = require("../../../../models/courses.model");
const {StatusCodes} = require("http-status-codes");
const { createError, badFieldsOrBadValuesFilter, copyObject } = require("../../../../utils/functions.utils");
const { default: mongoose } = require("mongoose");

class AdminChapterController{
    createNewChapter = async (req , res , next) => {
        try {
            const {title , text} = req.body;
            const courseID = new mongoose.Types.ObjectId(req.params.id);

            await this.#findCourseById(courseID);
            const result = await courseModel.updateOne(
                {_id : courseID},
                {$push : {chapters:{title , text , episodes:[]}}}
            );
            if(result.modifiedCount <= 0) throw createError(StatusCodes.INTERNAL_SERVER_ERROR , "متاسفانه چپتر اضافه نشد");
            

            res.status(StatusCodes.OK).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "چپتر با موفقیت اضافه شد",
                }
            })
        } catch (error) {
            next(error)
        }
    }
    getAllChapters = async (req , res , next) => {
        try {
            const courseID = new mongoose.Types.ObjectId(req.params.id);

            const result = await this.#findChaptersOfCourse(courseID , {
                chapters : 1,
                _id: 0,
            });            

            res.status(StatusCodes.OK).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "چپتر ها یافت شد",
                    data : {
                        result : result.chapters,
                    }
                }
            })
        } catch (error) {
            next(error)
        }
    }
    getChapter = async (req , res , next) => {
        try {
            const chapterID = new mongoose.Types.ObjectId(req.params.id);

            const result = await this.#findChapterById(chapterID , {
                "chapters.$" : 1,
            });            

            res.status(StatusCodes.OK).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "چپتر ها یافت شد",
                    data : {
                        result,
                    }
                }
            })
        } catch (error) {
            next(error)
        }
    }
    removeChapter = async (req , res , next) => {
        try {
            const chapterID = new mongoose.Types.ObjectId(req.params.id);

            await this.#findChapterById(chapterID);
            const result = await courseModel.updateOne(
                {"chapters._id" : chapterID},
                {
                    $pull : {chapters : {_id : chapterID}}
                }
            );
            if(result.modifiedCount <= 0) throw createError(StatusCodes.INTERNAL_SERVER_ERROR,"حذف انجام نشد");

            res.status(StatusCodes.OK).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "حذف با موفقیت انجام شد",
                }
            })
        } catch (error) {
            next(error)
        }
    }
    editChapter = async (req , res , next) => {
        try {
            //get required datas
            const chapterID = new mongoose.Types.ObjectId(req.params.id);
            let data = copyObject(req.body);
            const validFields = ["title" , "text"];

            //find chapter and return course
            const course = await this.#findChapterById(chapterID);

            //get chapter old datas and if we have new data replace it else put old data in update object
            //we do this to prevent chapter properties from changing into empty or removing problem while updating
            data = badFieldsOrBadValuesFilter(data , validFields);
            const chapter = course.chapters.find(item => item._id.equals(chapterID));
            validFields.forEach(item => {
                if(!data?.[item]) data[item] = chapter[item];
            })
            const result = await courseModel.updateOne(
                {"chapters._id" : chapterID},
                {$set : {"chapters.$" : data}}
            )
            if(result.modifiedCount <= 0) throw createError(StatusCodes.INTERNAL_SERVER_ERROR,"به روز رسانی انجام نشد");
            
            //send response
            res.status(StatusCodes.OK).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "به روز رسانی با موفقیت انجام شد",
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
    AdminChapterController : new AdminChapterController(),
}
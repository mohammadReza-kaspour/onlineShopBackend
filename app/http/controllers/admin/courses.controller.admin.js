const {StatusCodes} = require("http-status-codes");
const { courseModel } = require("../../../models/courses.model");
const { createError, badFieldsOrBadValuesFilter, copyObject } = require("../../../utils/functions.utils");
const { addImageToDataIfExists } = require("../../../utils/courses.utils");
const { default: mongoose } = require("mongoose");

class AdminCourseController {
    getAllCourses = async (req , res , next) => {
        try {
            const search = req?.query?.search
            let result = [];

            if(search) result = await courseModel.find({$text: {$search : search}});
            else result = await courseModel.find({});
            
            if(result.length <= 0) throw createError(StatusCodes.BAD_REQUEST , "دوره ای یافت نشد")

            res.status(StatusCodes.OK).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "دوره ها با موفقیت یافت شد",
                    data : {
                        result
                    }
                }
            })
        } catch (error) {
            next(error)
        }
    }
    createNewCourse = async (req , res , next) => {
        try {
            let data = {};
            const validFields = [
                "title",
                "short_desc",
                "total_desc",
                "tags",
                "category",
                "price",
                "discount",
                "type",
                "images"
            ];

            data = copyObject(req.body);
            data = addImageToDataIfExists(data , req);
            data = badFieldsOrBadValuesFilter(data , validFields);
            data.supplier = req.user._id;

            const result = await courseModel.create(data);
            if(!result) throw createError(StatusCodes.INTERNAL_SERVER_ERROR , "متاسفانه دوره ایجاد نشد");

            res.status(StatusCodes.OK).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "دوره به موفقیت ساخته شد",
                    data : {
                        result
                    }
                }
            })
        } catch (error) {
            next(error)
        }
    }
    createNewChapter = async (req , res , next) => {
        try {
            
            res.status(StatusCodes.OK).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "hi",
                    data : {}
                }
            })
        } catch (error) {
            next(error)
        }
    }
    createNewEpisode = async (req , res , next) => {
        try {
            
            res.status(StatusCodes.OK).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "hi",
                    data : {}
                }
            })
        } catch (error) {
            next(error)
        }
    }
    editCourse = async (req , res , next) => {
        try {
            
            res.status(StatusCodes.OK).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "hi",
                    data : {}
                }
            })
        } catch (error) {
            next(error)
        }
    }
    deleteCourse = async (req , res , next) => {
        try {
            
            res.status(StatusCodes.OK).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "hi",
                    data : {}
                }
            })
        } catch (error) {
            next(error)
        }
    }
    getCourse = async (req , res , next) => {
        try {
            const result = await courseModel.findOne({
                _id : new mongoose.Types.ObjectId(req.params.id),
            })
            if(!result) throw createError(StatusCodes.BAD_REQUEST , "دوره مورد نظر یافت نشد");

            res.status(StatusCodes.OK).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "دوره شما یافت شد",
                    data : {
                        result
                    }
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    AdminCourseController : new AdminCourseController(),
}
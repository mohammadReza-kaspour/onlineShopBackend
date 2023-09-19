const {StatusCodes} = require("http-status-codes");
const { courseModel } = require("../../../../models/courses.model");
const { createError, badFieldsOrBadValuesFilter, copyObject } = require("../../../../utils/functions.utils");
const { addImageToDataIfExists } = require("../../../../utils/courses.utils");
const { default: mongoose } = require("mongoose");

class AdminCourseController {
    getAllCourses = async (req , res , next) => {
        try {
            const search = req?.query?.search
            let matchObject = {};

            if(search) matchObject = {$text: {$search : search}};
            const result = await courseModel.aggregate([

                {
                    $match : matchObject
                },{
                    $lookup : {
                        from : "users",
                        localField : "supplier",
                        foreignField : "_id",
                        pipeline : [
                            {
                                $project : {
                                    _id : 1,
                                    mobile : 1
                                }
                            }
                        ],
                        as: "supplier",
                    }
                },{
                    $unwind : "$supplier",
                },
                {
                    $lookup : {
                        from : "categories",
                        localField : "category",
                        foreignField : "_id",
                        pipeline : [
                            {
                                $project : {
                                    title : 1
                                }
                            }
                        ],
                        as: "category",
                    }
                },
            ])
            
            if(result.length <= 0) throw createError(StatusCodes.BAD_REQUEST , "دوره ای یافت نشد")

            res.status(StatusCodes.OK).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "دوره ها با موفقیت یافت شد",
                    foundedItem : result.length,
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
            data = addImageToDataIfExists(data , req , true);
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
            const courseID = new mongoose.Types.ObjectId(req.params.courseid);
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
            data = addImageToDataIfExists(data , req , false);
            data = badFieldsOrBadValuesFilter(data , validFields);
            data.supplier = req.user._id;

            await this.#findCourseById(courseID)
            const result = await courseModel.updateOne(
                {_id : courseID},
                {
                    $set : data,
                }
            );
            if(result.modifiedCount <= 0) throw createError(StatusCodes.INTERNAL_SERVER_ERROR,"به روز رسانی انجام نشد");

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
    #findCourseById = async (mongoID) => {
        const result = await courseModel.findOne({
            _id : mongoID,
        });
        if(!result) throw createError(StatusCodes.NOT_FOUND , "دوره مورد نظر یافت نشد");
        return result;
    }
}

module.exports = {
    AdminCourseController : new AdminCourseController(),
}
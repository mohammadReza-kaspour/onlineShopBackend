const { categoryModel } = require("../../../models/categories.model");
const { createError } = require("../../../utils/functions.utils");

class AdminCategoryController {
    addCategory = async (req , res , next) => {
        try {
            const {title , parent} = req.body;
            const category = await categoryModel.create({title , parent: !!parent?parent:undefined});
            if(!category) throw createError(500 , "دسته بندی ایجاد نشد دوباره تلاش نمائید");

            res.status(200).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "دسته بندی با موفقیت ایجاد شد",
                    data : {
                        category,
                    }
                }
            })
        } catch (error) {
            next(error)
        }
    }
    removeCategory = async (req , res , next) => {
        try {
            const {id} =req.params;
            const category = await categoryModel.findOneAndDelete({_id:id});
            if(!category) throw createError(400 , "دسته بندی یافت نشد");

            res.status(200).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "hi",
                    data : category
                }
            })
        } catch (error) {
            next(error)
        }
    }
    editCategory = async (req , res , next) => {
        try {
            
            res.status(200).json({
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
    getAllCategory = async (req , res , next) => {
        try {
            const result = await categoryModel.aggregate([
                {
                    $lookup : {
                        from : "categories",
                        localField : "_id",
                        foreignField : "parent",
                        as : "children"
                    }
                }
            ])

            res.status(200).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "hi",
                    data : result
                }
            })
        } catch (error) {
            next(error)
        }
    }
    getCategoryByID = async (req , res , next) => {
        try {
            
            res.status(200).json({
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
    getParents = async (req , res , next) => {
        try {
            const parents = await categoryModel.find({parent : undefined})
            
            res.status(200).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "hi",
                    data : parents
                }
            })
        } catch (error) {
            next(error)
        }
    }
    getChilds = async (req , res , next) => {
        try {
            const {parent} = req.params;
            const result = await categoryModel.find({parent})

            res.status(200).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "hi",
                    data : result
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    AdminCategoryController : new AdminCategoryController(),
}
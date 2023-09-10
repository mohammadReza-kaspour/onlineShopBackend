const { default: mongoose } = require("mongoose");
const { blogModel } = require("../../../models/blogs.model");
const { createError, badFieldsOrBadValuesFilter } = require("../../../utils/functions.utils");

class BlogController {
    createBlog = async (req , res , next) => {
        try {
            const {title , text , categories , tags} = req.body;
            const file = req.file;
            const author = req.user._id;

            const result = await blogModel.create({author,title,text,tags,category:categories,image:file.path});
            if(!result) throw createError(500 , "بلاگ ایجاد نشد")
            
            res.status(200).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "بلاگ شما با موفقیت ایجاد شد",
                    data : {
                        result,
                    }
                }
            })
        } catch (error) {
            next(error)
        }
    }
    getBlogByID = async (req , res , next) => {
        try {
            
            const result = await blogModel.aggregate([
                {
                    $match: {_id : new mongoose.Types.ObjectId(req.params.id)},
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "author",
                        foreignField: "_id",
                        as: "author",
                    }
                },
                {
                    $unwind: "$author",
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category",
                    }
                }
            ]);
            if(result.length <= 0) throw createError(400 , "بلاگ مورد نظر یافت نشد")
            
            res.status(200).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "بلاگ مورد نظر یافت شد",
                    data : {
                        result
                    }
                }
            })
        } catch (error) {
            next(error)
        }
    }
    getAllBlogs = async (req , res , next) => {
        try {
            const blogs = await blogModel.aggregate([
                {
                    $match : {},
                },
                {
                    $lookup : {
                        from : "users",
                        localField : "author",
                        foreignField : "_id",
                        as : "author"
                    }
                },
                {
                    $unwind : "$author",
                },
                {
                    $lookup : {
                        from : "categories",
                        localField : "category",
                        foreignField : "_id",
                        as : "category"
                    }
                },
            ]);
            
            res.status(200).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "hi",
                    data : {
                        blogs
                    }
                }
            })
        } catch (error) {
            next(error)
        }
    }
    getCommentsOfBlog = async (req , res , next) => {
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
    deleteBlogByID = async (req , res , next) => {
        try {

            const result = await blogModel.findOneAndDelete({
                _id : new mongoose.Types.ObjectId(req.params.id),
            })
            if(!result) throw createError(400 , "بلاگ مورد نظر یافت نشد");

            res.status(200).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "بلاگ مورد نظر با موفقیت حذف شد",
                    data : {
                        result,
                    }
                }
            })
        } catch (error) {
            next(error)
        }
    }
    updateBlogByID = async (req , res , next) => {
        try {
            const data = req.body;
            let filteredData = badFieldsOrBadValuesFilter(data , ["title","text","categories","tags"])
            Object.entries(filteredData).forEach(([key , value]) => {//remove empty arrays from categories snd tags if empty
                if(Array.isArray(value) && value.length <= 0) delete filteredData[key];
            })
            if(req?.file) filteredData.image = req.file.path;   // add image if exists
            filteredData["category"] = filteredData["categories"];
            delete filteredData["categories"];
            
            const result = await blogModel.findOneAndUpdate(
                {
                    _id: new mongoose.Types.ObjectId(req.params.id),
                },
                {
                    $set: {
                        ...filteredData,
                    }
                }
            )
            if(!result) throw createError(400, "بلاگ یافت نشد");

            res.status(200).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "بلاگ با موفقیت به روز رسانی شد",
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
    BlogController : new BlogController,
}
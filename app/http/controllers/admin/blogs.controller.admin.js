const { blogModel } = require("../../../models/blogs.model");
const { createError } = require("../../../utils/functions.utils");
const { deleteJunkFilesAfterBreakUploading } = require("../../../utils/multer.utils");

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
    updateBlogByID = async (req , res , next) => {
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
}

module.exports = {
    BlogController : new BlogController,
}
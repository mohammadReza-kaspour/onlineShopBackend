const { blogModel } = require("../../../models/blogs.model");
const { createError } = require("../../../utils/functions.utils");
const { deleteJunkFilesAfterBreakUploading } = require("../../../utils/multer.utils");

class BlogController {
    createBlog = async (req , res , next) => {
        try {
            const {title , text , categories , tags} = req.body;
            const body = req.body;
            const file = req.file;

            const result = await blogModel.create({title,text,tags,categoty:categories,image:file.path});
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
            deleteJunkFilesAfterBreakUploading(req.file.path);
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
            const blogs = await blogModel.find({});
            
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
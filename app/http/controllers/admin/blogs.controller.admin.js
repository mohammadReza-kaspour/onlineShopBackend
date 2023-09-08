const { blogModel } = require("../../../models/blogs.model");

class BlogController {
    createBlog = async (req , res , next) => {
        try {
            const {title , text , categories , tags} = req.body;
            const body = req.body;
            const img = req.file;
            
            res.status(200).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "بلاگ شما با موفقیت ایجاد شد",
                    data : {
                        body,
                        img
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
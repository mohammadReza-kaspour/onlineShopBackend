const { BlogController } = require("../../http/controllers/admin/blogs.controller.admin");
const { parserMiddlewareByCustomField } = require("../../http/middlewares/admin/blogs.middleware.admin");
const { expressValidatorMapper } = require("../../http/middlewares/public.middleware");
const { createBlogValidation } = require("../../http/validations/admin/blogs.validation.admin");
const { uploadFile } = require("../../utils/multer.utils");

const router = require("express").Router();

/**
 * tags:
 *  -   name: Admin-Blog
 *      description: admin blog routes
 */
/**
 * @swagger
 * /admin/blog/get-all-blogs:
 *  get:
 *      summary: get all blogs
 *      description: get all blogs
 *      tags: [Admin-Blog]
 *      responses:
 *          200:
 *              name: Success
 *          400:
 *              name: Bad request
 */
router.get("/get-all-blogs" , BlogController.getAllBlogs);

/**
 * @swagger
 * /admin/blog/create:
 *  post:
 *      summary: create blog
 *      description: create blog
 *      tags: [Admin-Blog]
 *      consumes: 
 *          -   multipart/form-data
 *      parameters:
 *          -   in: formData
 *              name: title
 *              required: true
 *              type: string
 *          -   in: formData
 *              name: text
 *              required: true
 *              type: string
 *          -   in: formData
 *              name: categories
 *              required: true
 *              type: string
 *              example: cat1,cat2,cat3,....
 *          -   in: formData
 *              name: tags
 *              required: true
 *              type: string
 *              example: tag1,tag2,tag3,....
 *          -   in: formData
 *              name: image
 *              required: true
 *              type: file
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Bad request
 *          500:
 *              description: Internal Server Error
 */
router.post("/create" ,
            uploadFile.single("image"),
            parserMiddlewareByCustomField("categories" , ","),
            parserMiddlewareByCustomField("tags" , ","),
            createBlogValidation(),
            expressValidatorMapper,
            BlogController.createBlog);

module.exports = {
    adminBlogRoutes : router,
}
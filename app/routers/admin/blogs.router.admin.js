const { BlogController } = require("../../http/controllers/admin/blogs.controller.admin");
const { parserMiddlewareByCustomField } = require("../../http/middlewares/admin/blogs.middleware.admin");
const { expressValidatorMapper, checkAccessTokenToLoggin, swaggerFreeObjectFixer } = require("../../http/middlewares/public.middleware");
const { createBlogValidation, getBlogByIDValidation, updateBlogValidation } = require("../../http/validations/admin/blogs.validation.admin");
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
 *      parameters:
 *          -   in: header
 *              name: authorization
 *              description: put access token to login
 *              value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTExOTQ2MTU2OCIsImlhdCI6MTY5NDI5MDYxNiwiZXhwIjoxNjk0ODk1NDE2fQ.kR0BZZKw1O98eg8ACHhS6OEmerS8o5yTw-w25apzN6o
 *              required: true
 *              type: string
 *              example: Bearer token.....
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
 *          -   in: header
 *              name: authorization
 *              description: put access token to login
 *              value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTExOTQ2MTU2OCIsImlhdCI6MTY5NDI5MDYxNiwiZXhwIjoxNjk0ODk1NDE2fQ.kR0BZZKw1O98eg8ACHhS6OEmerS8o5yTw-w25apzN6o
 *              required: true
 *              type: string
 *              example: Bearer token.....
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
            BlogController.createBlog
);

/**
 * @swagger
 * /admin/blog/get-by-id/{id}:
 *  get:
 *      summary: get blog by id
 *      description: get blog by id
 *      tags: [Admin-Blog]
 *      parameters:
 *          -   in: header
 *              name: authorization
 *              description: put access token to login
 *              value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTExOTQ2MTU2OCIsImlhdCI6MTY5NDI5MDYxNiwiZXhwIjoxNjk0ODk1NDE2fQ.kR0BZZKw1O98eg8ACHhS6OEmerS8o5yTw-w25apzN6o
 *              required: true
 *              type: string
 *              example: Bearer token.....
 *          -   in: path
 *              name: id
 *              description: blog id(object id)
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              name: Seccess
 *          400:
 *              name: Bad Request
 *          500:
 *              name: Internal Server Error
 */
router.get("/get-by-id/:id" ,
            getBlogByIDValidation(),
            expressValidatorMapper,
            BlogController.getBlogByID
);

/**
 * @swagger
 * /admin/blog/remove/{id}:
 *  delete:
 *      summary: get blog by id
 *      description: get blog by id
 *      tags: [Admin-Blog]
 *      parameters:
 *          -   in: header
 *              name: authorization
 *              description: put access token to login
 *              value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTExOTQ2MTU2OCIsImlhdCI6MTY5NDI5MDYxNiwiZXhwIjoxNjk0ODk1NDE2fQ.kR0BZZKw1O98eg8ACHhS6OEmerS8o5yTw-w25apzN6o
 *              required: true
 *              type: string
 *              example: Bearer token.....
 *          -   in: path
 *              name: id
 *              description: blog id(object id)
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              name: Seccess
 *          400:
 *              name: Bad Request
 *          500:
 *              name: Internal Server Error
 */
router.delete("/remove/:id" ,
            getBlogByIDValidation(),
            expressValidatorMapper,
            BlogController.deleteBlogByID
);

/**
 * @swagger
 * /admin/blog/update/{id}:
 *  put:
 *      summary: create blog
 *      description: create blog
 *      tags: [Admin-Blog]
 *      consumes: 
 *          -   multipart/form-data
 *      parameters:
 *          -   in: header
 *              name: authorization
 *              description: put access token to login
 *              value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTExOTQ2MTU2OCIsImlhdCI6MTY5NDI5MDYxNiwiZXhwIjoxNjk0ODk1NDE2fQ.kR0BZZKw1O98eg8ACHhS6OEmerS8o5yTw-w25apzN6o
 *              required: true
 *              type: string
 *              example: Bearer token.....
 *          -   in: path
 *              name: id
 *              required: true
 *              type: string
 *          -   in: formData
 *              name: title
 *              type: string
 *          -   in: formData
 *              name: text
 *              type: string
 *          -   in: formData
 *              name: categories
 *              type: string
 *              example: cat1,cat2,cat3,....
 *          -   in: formData
 *              name: tags
 *              type: string
 *              example: tag1,tag2,tag3,....
 *          -   in: formData
 *              name: image
 *              type: file
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Bad request
 *          500:
 *              description: Internal Server Error
 */
router.put("/update/:id" ,
            swaggerFreeObjectFixer,
            uploadFile.single("image"),
            parserMiddlewareByCustomField("categories" , ","),
            parserMiddlewareByCustomField("tags" , ","),
            updateBlogValidation(),
            expressValidatorMapper,
            BlogController.updateBlogByID
);

module.exports = {
    adminBlogRoutes : router,
}
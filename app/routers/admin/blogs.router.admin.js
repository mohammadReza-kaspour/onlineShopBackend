const { BlogController } = require("../../http/controllers/admin/blogs.controller.admin");

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

module.exports = {
    adminBlogRoutes : router,
}
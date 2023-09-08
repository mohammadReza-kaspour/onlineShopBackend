const { adminBlogRoutes } = require("./blogs.router.admin");
const { adminCategoryRoutes } = require("./categories.router.admin");

const router = require("express").Router();

/**
 * @swagger
 *  tags:
 *      -   name: Admin-Panel
 *          description : admin panel routes    
 */
router.use("/category" , adminCategoryRoutes);
router.use("/blog" , adminBlogRoutes);

module.exports = {
    adminAllRoutes : router,
}
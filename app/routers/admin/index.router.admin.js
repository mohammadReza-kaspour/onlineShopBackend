const { checkAccessTokenToLoggin } = require("../../http/middlewares/public.middleware");
const { adminBlogRoutes } = require("./blogs.router.admin");
const { adminCategoryRoutes } = require("./categories.router.admin");
const { adminProductRoutes } = require("./products.router.admin");

const router = require("express").Router();

/**
 * @swagger
 *  tags:
 *      -   name: Admin-Panel
 *          description : admin panel routes  
 *      -   name: Admin-Product
 *          description : Admin-Product routes 
 *      -   name: Admin-Blog
 *          description : Admin-Blog routes 
 *      -   name: Admin-Category
 *          description : Admin-Category routes   
 */
router.use("/category" , adminCategoryRoutes);
router.use("/blog" , adminBlogRoutes);
router.use("/product" , adminProductRoutes);

module.exports = {
    adminAllRoutes : router,
}
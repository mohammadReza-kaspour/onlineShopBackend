const { checkAccessTokenToLoggin } = require("../../http/middlewares/public.middleware");
const { adminBlogRoutes } = require("./blogs.router.admin");
const { adminCategoryRoutes } = require("./categories.router.admin");
const { adminCourseRoutes } = require("./courses.router.admin");
const { adminProductRoutes } = require("./products.router.admin");

const router = require("express").Router();

router.use("/category" , adminCategoryRoutes);
router.use("/blog" , adminBlogRoutes);
router.use("/product" , adminProductRoutes);
router.use("/course" , adminCourseRoutes);

module.exports = {
    adminAllRoutes : router,
}
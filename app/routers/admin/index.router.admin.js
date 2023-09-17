const { checkAccessTokenToLoggin } = require("../../http/middlewares/public.middleware");
const { adminBlogRoutes } = require("./blogs.router.admin");
const { adminCategoryRoutes } = require("./categories.router.admin");
const { adminChapterRoutes } = require("./chapters.router.admin");
const { adminCourseRoutes } = require("./courses.router.admin");
const { adminEpisodeRoutes } = require("./episodes.router.admin");
const { adminProductRoutes } = require("./products.router.admin");

const router = require("express").Router();

router.use("/category" , adminCategoryRoutes);
router.use("/blog" , adminBlogRoutes);
router.use("/product" , adminProductRoutes);
router.use("/course" , adminCourseRoutes);
router.use("/chapter" , adminChapterRoutes);
router.use("/episode" , adminEpisodeRoutes);

module.exports = {
    adminAllRoutes : router,
}
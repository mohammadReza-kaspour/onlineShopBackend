const { checkPermission } = require("../../http/middlewares/permission.guard");
const { checkAccessTokenToLoggin } = require("../../http/middlewares/public.middleware");
const { adminBlogRoutes } = require("./blogs.router.admin");
const { adminCategoryRoutes } = require("./categories.router.admin");
const { adminChapterRoutes } = require("./chapters.router.admin");
const { adminCourseRoutes } = require("./courses.router.admin");
const { adminEpisodeRoutes } = require("./episodes.router.admin");
const { adminPermissionRoutes } = require("./permissions.router.admin");
const { adminProductRoutes } = require("./products.router.admin");
const { adminRolesRoutes } = require("./roles.router.admin");
const { adminUserRoutes } = require("./users.router.admin");

const router = require("express").Router();

router.use("/category" , checkPermission([]) , adminCategoryRoutes);
router.use("/blog" , checkPermission([]) , adminBlogRoutes);
router.use("/product" , checkPermission([]) , adminProductRoutes);
router.use("/course" , checkPermission([]) , adminCourseRoutes);
router.use("/chapter" , checkPermission([]) , adminChapterRoutes);
router.use("/episode" , checkPermission([]) , adminEpisodeRoutes);
router.use("/user" , checkPermission([]) , adminUserRoutes);
router.use("/role" , checkPermission([]) , adminRolesRoutes);
router.use("/permission" , checkPermission([]) ,adminPermissionRoutes);


module.exports = {
    adminAllRoutes : router,
}
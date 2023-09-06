const { adminCategoryRoutes } = require("./categories.router.admin");

const router = require("express").Router();

/**
 * tags:
 *  name: Admin-Panel
 *  description: admin panel routes to controll over every thing
 */
router.use("/category" , adminCategoryRoutes);

module.exports = {
    adminAllRoutes : router,
}
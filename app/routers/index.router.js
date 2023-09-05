const { apiAllRoutes } = require("./api/index.router.api");
const { userAllRoutes } = require("./user/index.router.user");

const router = require("express").Router();

router.use("/" , apiAllRoutes);
router.use("/user" , userAllRoutes);

module.exports = {
    allRoutes : router,
}
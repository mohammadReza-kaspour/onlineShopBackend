const { apiAllRoutes } = require("./api/index.router.api");

const router = require("express").Router();

router.use("/" , apiAllRoutes);

module.exports = {
    allRoutes : router,
}
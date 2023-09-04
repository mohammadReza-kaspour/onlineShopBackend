const { apiHomeRoutes } = require("./home.router.api");

const router = require("express").Router();

router.use("/" , apiHomeRoutes); 

module.exports = {
    apiAllRoutes : router,
}
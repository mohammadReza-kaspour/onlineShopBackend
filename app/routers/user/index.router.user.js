const { userAuthRoutes } = require("./auth.router.user");

const router = require("express").Router();

router.use("/auth" , userAuthRoutes);

module.exports = {
    userAllRoutes : router,
}
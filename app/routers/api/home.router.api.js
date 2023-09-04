const { HomeController } = require("../../http/controllers/api/home.controller.api");
const router = require("express").Router();

router.get("/" , HomeController.indexPage);

module.exports = {
    apiHomeRoutes : router,
}
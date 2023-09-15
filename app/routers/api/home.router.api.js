const { HomeController } = require("../../http/controllers/api/home.controller.api");
const { checkAccessTokenToLoggin } = require("../../http/middlewares/public.middleware");
const router = require("express").Router();

router.get("/" , checkAccessTokenToLoggin , HomeController.indexPage);

module.exports = {
    apiHomeRoutes : router,
}
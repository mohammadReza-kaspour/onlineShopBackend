const { HomeController } = require("../../http/controllers/api/home.controller.api");
const router = require("express").Router();
/**
 * tags:
 *  name: homePage
 *  description : home page routes
 */
/**
 * @swagger
 * /:
 *  get:
 *      summary: home page
 *      description: this is home page route
 *      tags: [homePage]
 *      responses:
 *          200:
 *              description: success
 *          400:
 *              description: not found 
 */
router.get("/" , HomeController.indexPage);

module.exports = {
    apiHomeRoutes : router,
}
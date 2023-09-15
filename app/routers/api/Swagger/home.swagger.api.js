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
 *      parameters:
 *          -   in: header
 *              name: authorization
 *              example: Bearer yourToken ....
 *      responses:
 *          200:
 *              description: success
 *          400:
 *              description: not found 
 */
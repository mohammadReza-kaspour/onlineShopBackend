
/////routers
//get all users
/**
 * @swagger
 *  /admin/user/all:
 *      get:
 *          summary: get all users
 *          description: get all users
 *          tags: [Admin-UserController]
 *          parameters:
 *              -   in: query
 *                  type: string
 *                  name: search
 *                  description: search input string into firstname-lastname-username-mobile-email
 *          responses:
 *              200:
 *                  description: Seccess
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/PublicSuccessDefinition"
 *              400:
 *                  description: Bad Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/PublicErrorDefinition" 
 */







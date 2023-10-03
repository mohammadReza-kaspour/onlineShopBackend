/**
 * @swagger
 *  components:
 *      schemas:
 *          AddNameSpace:
 *              type: object
 *              required:
 *                  -   title
 *                  -   endpoint
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of namespace
 *                  endpoint:
 *                      type: string
 *                      description: endpoint of namespace
 */


/////routes

//add
/**
 * @swagger
 *  /support/namespace/add:
 *      post:
 *          summary: add namespace
 *          description: add namespace
 *          tags: [SupportChat-Routes]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref : "#/components/schemas/AddNameSpace"
 *                  application/json:
 *                      schema:
 *                          $ref : "#/components/schemas/AddNameSpace"
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref : "#/definitions/PublicSuccessDefinition"
 *              400:
 *                  description: Bad Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref : "#/definitions/PublicErrorDefinition"
 */

//get all
/**
 * @swagger
 *  /support/namespace/get-all:
 *      get:
 *          summary: get all namespace
 *          description: get all namespace
 *          tags: [SupportChat-Routes]
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref : "#/definitions/PublicSuccessDefinition"
 *              400:
 *                  description: Bad Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref : "#/definitions/PublicErrorDefinition"
 */



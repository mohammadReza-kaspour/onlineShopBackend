/**
 * @swagger
 *  components:
 *      schemas:
 *          AddRoom:
 *              type: object
 *              required:
 *                  -   endpoint
 *                  -   name
 *                  -   description
 *                  -   image
 *              properties:
 *                  endpoint:
 *                      type: string
 *                      description: endpoint of room
 *                  name:
 *                      type: string
 *                      description: name of room
 *                  description:
 *                      type: string
 *                      description: description of room
 *                  image:
 *                      type: string
 *                      format: binary
 *                      description: image of room
 *          AddMessage:
 *              type: object
 *              required:
 *                  -   message
 *              properties:
 *                  message:
 *                      type: string
 *                      description: message of chat
 */



/////routes

//add
/**
 * @swagger
 *  /support/room/add:
 *      post:
 *          summary: add room
 *          description: add room
 *          tags: [SupportChat-Routes]
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref : "#/components/schemas/AddRoom"
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
 *  /support/room/get-all:
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




/////schemas

/**
 * @swagger
 *  components:
 *      schemas:
 *          AddChapter:
 *              type: object
 *              required:
 *                  -   title
 *                  -   text
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of chapter
 *                  text:
 *                      type: string
 *                      description: text of chapter
 */

/////definitions
/**
 * @swagger
 *  definitions:
 *      GetChapters:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              success:
 *                  type: boolean
 *                  example: true
 *              data:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          example: محصول شما با موفقیت یافت شد
 *                      data:
 *                          type: object
 *                          properties:
 *                              result:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          title:
 *                                              type: string
 *                                              example: title of chapter
 *                                          text:
 *                                              type: string
 *                                              example: text of chapter
 *                                          episodes:
 *                                              type: array
 *                                              example: [episodes of chapter]
 *                                          _id:
 *                                              type: string
 *                                              example: _id of chapter
 */



/////routers

/**
 * @swagger
 *  /admin/chapter/add-chapter/{id}:
 *      put:
 *          summary: add chapter
 *          description: add chapter
 *          tags: [Admin-Chapter]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  description: course id
 *                  type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/AddChapter"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/AddChapter"
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      applicstion/json:
 *                          schema:
 *                              $ref: "#/definitions/PublicSuccessDefinition"
 *              400:
 *                  description: Bad Request
 *                  content:
 *                      applicstion/json:
 *                          schema:
 *                              $ref: "#/definitions/PublicErrorDefinition"
 */












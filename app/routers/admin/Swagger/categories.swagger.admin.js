/**
 * @swagger
 *  components:
 *      schemas:
 *          Add:
 *              type: object
 *              required:
 *                  - title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of category
 *                  parent:
 *                      type: string
 *                      description: parent of category
 *          Update:
 *              type: object
 *              required:
 *                  - title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of category
 */

/**
 * tags:
 *  name: Admin-Category
 *  description: admin caterory routes
 */

/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          summary: add category
 *          description: add category with its parent to database
 *          tags: [Admin-Category]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/Add"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Add"
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: Unauthorized
 *              500:
 *                  description: Internal Server Error
 */

/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          summary: getparents
 *          description: get category parents
 *          tags: [Admin-Category]
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: Unauthorized
 *              500:
 *                  description: Internal Server Error
 */

/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *          summary: getparents
 *          description: get category parents
 *          tags: [Admin-Category]
 *          parameters:
 *              -   in: path
 *                  name: parent
 *                  required: true
 *                  type: string
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: Unauthorized
 *              500:
 *                  description: Internal Server Error
 */

/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          summary: get allcategories
 *          description: et allcategories
 *          tags: [Admin-Category]
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: Unauthorized
 *              500:
 *                  description: Internal Server Error
 */

/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:
 *          summary: remove category
 *          description: remove category
 *          tags: [Admin-Category]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  type: string
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: Unauthorized
 *              500:
 *                  description: Internal Server Error
 */

/**
 * @swagger
 *  /admin/category/get-by-id/{id}:
 *      get:
 *          summary: get category by id
 *          description: get category by id
 *          tags: [Admin-Category]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  type: string
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: Unauthorized
 *              500:
 *                  description: Internal Server Error
 */

/**
 * @swagger
 *  /admin/category/update/{id}:
 *      put:
 *          summary: update category
 *          description: update category
 *          tags: [Admin-Category]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  description: id of category
 *                  required: true
 *                  type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/Update"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Update"
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: Unauthorized
 *              500:
 *                  description: Internal Server Error
 */

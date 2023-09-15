/**
 * @swagger
 *  components:
 *      schemas:
 *          AddCourse:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_desc
 *                  -   total_desc
 *                  -   images
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   type
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of product
 *                      example: عنوان دوره
 *                  short_desc:
 *                      type: string
 *                      description: short_desc of product
 *                      example: توضیح کوتاه
 *                  total_desc:
 *                      type: string
 *                      description: total_desc of product
 *                      example: توضیح کامل
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  tags:
 *                      type: array
 *                      description: tags of product
 *                  category:
 *                      type: array
 *                      description: category of product
 *                  price:
 *                      type: string
 *                      description: price of product
 *                      example: قیمت دوره
 *                  discount:
 *                      type: string
 *                      description: discount of product
 *                      example: تخفیف دوره
 *                  type:
 *                      description: type of product
 *                      type: string
 *                      enum:
 *                          -   free
 *                          -   cash
 *                          -   vip
 */

/**
 * tags:
 *  name: Admin-Course
 *  description: admin course panel
 */

/**
 * @swagger
 *  /admin/course/all:
 *      get:
 *          summary: get all courses
 *          description: get all courses
 *          tags: [Admin-Course]
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  description: search query inside title,short-desc,total-desc
 *                  type: string
 *          responses:
 *              200:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              500:
 *                  description: Internal Server Error
 */

/**
 * @swagger
 *  /admin/course/add-course:
 *      post:
 *          summary: add course
 *          description: add course
 *          tags: [Admin-Course]
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/AddCourse"
 *          responses:
 *              200:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              500:
 *                  description: Internal Server Error
 */

/**
 * @swagger
 *  /admin/course/get-course/{id}:
 *      get:
 *          summary: get all courses
 *          description: get all courses
 *          tags: [Admin-Course]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  description: course id
 *                  type: string
 *          responses:
 *              200:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              500:
 *                  description: Internal Server Error
 */


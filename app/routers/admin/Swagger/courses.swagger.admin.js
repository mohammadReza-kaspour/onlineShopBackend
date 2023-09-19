/////schemas section
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
 * @swagger
 *  components:
 *      schemas:
 *          UpdateCourse:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of product
 *                  short_desc:
 *                      type: string
 *                      description: short_desc of product
 *                  total_desc:
 *                      type: string
 *                      description: total_desc of product
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
 *                  discount:
 *                      type: string
 *                      description: discount of product
 *                  type:
 *                      description: type of product
 *                      type: string
 *                      enum:
 *                          -   free
 *                          -   cash
 *                          -   vip
 */


///// definition section

/**
 * @swagger
 *  definitions:
 *      GetAllCourses:
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
 *                                          _id:
 *                                              type: string
 *                                              example: 65037e7579657978b628157c
 *                                          title:
 *                                              type: string
 *                                              example: wordpress course
 *                                          short_desc:
 *                                              type: string
 *                                              example: this wordpress course .....
 *                                          total_desc:
 *                                              type: string
 *                                              example: this wordpress course .....
 *                                          images:
 *                                              type: array
 *                                              example: [public\uploads\2023\9\15\1694728162476.jpg,public\uploads\2023\9\15\1694728162476.jpg]
 *                                          tags:
 *                                              type: array
 *                                              example: [tag1,tag2,tag3]
 *                                          category:
 *                                              type: array
 *                                              example: [cat1,cat2,cat3]
 *                                          price:
 *                                              type: string
 *                                              example: 100
 *                                          discount:
 *                                              type: string
 *                                              example: 5   
 *                                          status:
 *                                              type: string
 *                                              example: notstarted
 *                                          type:
 *                                              type: string
 *                                              example: free
 *                                          time:
 *                                              type: string
 *                                              example: 00:00:00
 */

/**
 * tags:
 *  name: Admin-Course
 *  description: admin course panel
 */

/////routers

//get all courses
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
 *                  content:
 *                      applicstion/json:
 *                          schema:
 *                              $ref: "#/definitions/GetAllCourses"
 *              400:
 *                  description: Bad Request
 *                  content:
 *                      applicstion/json:
 *                          schema:
 *                              $ref: "#/definitions/PublicErrorDefinition"
 */

//add course
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
 *                  content:
 *                      applicstion/json:
 *                          schema:
 *                              $ref: "#/definitions/GetAllCourses"
 *              400:
 *                  description: Bad Request
 *                  content:
 *                      applicstion/json:
 *                          schema:
 *                              $ref: "#/definitions/PublicErrorDefinition"
 */

//get course by id
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
 *                  content:
 *                      applicstion/json:
 *                          schema:
 *                              $ref: "#/definitions/GetAllCourses"
 *              400:
 *                  description: Bad Request
 *                  content:
 *                      applicstion/json:
 *                          schema:
 *                              $ref: "#/definitions/PublicErrorDefinition"
 */

//update course
/**
 * @swagger
 *  /admin/course/edit/{courseid}:
 *      put:
 *          summary: edit course
 *          description: edit course
 *          tags: [Admin-Course]
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  required: true
 *                  name: courseid
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/UpdateCourse"
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



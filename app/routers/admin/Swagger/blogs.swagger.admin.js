/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateBlog:
 *              type: object
 *              required:
 *                  -   title
 *                  -   text
 *                  -   categories
 *                  -   tags
 *                  -   image
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of blog
 *                  text:
 *                      type: string
 *                      description: text of blog
 *                  categories:
 *                      type: string
 *                      description: categories of blog for example cat1,cat2,cat3,.....
 *                  tags:
 *                      type: string
 *                      description: tags of blog for example tag1,tag2,tag3,.....
 *                  image:
 *                      type: file
 *                      description: title of blog
 *          UpdateBlog:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of blog
 *                  text:
 *                      type: string
 *                      description: text of blog
 *                  categories:
 *                      type: string
 *                      description: categories of blog for example cat1,cat2,cat3,.....
 *                  tags:
 *                      type: string
 *                      description: tags of blog for example tag1,tag2,tag3,.....
 *                  image:
 *                      type: file
 *                      description: title of blog
 */

/**
 * tags:
 *  -   name: Admin-Blog
 *      description: admin blog routes
 */

/**
 * @swagger
 * /admin/blog/get-all-blogs:
 *  get:
 *      summary: get all blogs
 *      description: get all blogs
 *      tags: [Admin-Blog]
 *      parameters:
 *          -   in: header
 *              name: authorization
 *              description: put access token to login
 *              value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTExOTQ2MTU2OCIsImlhdCI6MTY5NDI5MDYxNiwiZXhwIjoxNjk0ODk1NDE2fQ.kR0BZZKw1O98eg8ACHhS6OEmerS8o5yTw-w25apzN6o
 *              required: true
 *              type: string
 *              example: Bearer token.....
 *      responses:
 *          200:
 *              name: Success
 *          400:
 *              name: Bad request
 */

/**
 * @swagger
 * /admin/blog/create:
 *  post:
 *      summary: create blog
 *      description: create blog
 *      tags: [Admin-Blog]
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: "#/components/schemas/CreateBlog"
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Bad request
 *          500:
 *              description: Internal Server Error
 */

/**
 * @swagger
 * /admin/blog/get-by-id/{id}:
 *  get:
 *      summary: get blog by id
 *      description: get blog by id
 *      tags: [Admin-Blog]
 *      parameters:
 *          -   in: header
 *              name: authorization
 *              description: put access token to login
 *              value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTExOTQ2MTU2OCIsImlhdCI6MTY5NDI5MDYxNiwiZXhwIjoxNjk0ODk1NDE2fQ.kR0BZZKw1O98eg8ACHhS6OEmerS8o5yTw-w25apzN6o
 *              required: true
 *              type: string
 *              example: Bearer token.....
 *          -   in: path
 *              name: id
 *              description: blog id(object id)
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              name: Seccess
 *          400:
 *              name: Bad Request
 *          500:
 *              name: Internal Server Error
 */

/**
 * @swagger
 * /admin/blog/remove/{id}:
 *  delete:
 *      summary: get blog by id
 *      description: get blog by id
 *      tags: [Admin-Blog]
 *      parameters:
 *          -   in: header
 *              name: authorization
 *              description: put access token to login
 *              value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTExOTQ2MTU2OCIsImlhdCI6MTY5NDI5MDYxNiwiZXhwIjoxNjk0ODk1NDE2fQ.kR0BZZKw1O98eg8ACHhS6OEmerS8o5yTw-w25apzN6o
 *              required: true
 *              type: string
 *              example: Bearer token.....
 *          -   in: path
 *              name: id
 *              description: blog id(object id)
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              name: Seccess
 *          400:
 *              name: Bad Request
 *          500:
 *              name: Internal Server Error
 */

/**
 * @swagger
 * /admin/blog/update/{id}:
 *  put:
 *      summary: create blog
 *      description: create blog
 *      tags: [Admin-Blog]
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: "#/components/schemas/UpdateBlog"
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Bad request
 *          500:
 *              description: Internal Server Error
 */


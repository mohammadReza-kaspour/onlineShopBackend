const { AdminCategoryController } = require("../../http/controllers/admin/category.controller.admin");
const { expressValidatorMapper } = require("../../http/middlewares/public.middleware");
const { addCategoryValidation, getCategoryByIdValidation, updateCategoryValidation } = require("../../http/validations/admin/category.validation.admin");

const router = require("express").Router();

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
 *          parameters:
 *              -   in: header
 *                  name: authorization
 *                  description: put access token to login
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTExOTQ2MTU2OCIsImlhdCI6MTY5NDI5MDYxNiwiZXhwIjoxNjk0ODk1NDE2fQ.kR0BZZKw1O98eg8ACHhS6OEmerS8o5yTw-w25apzN6o
 *                  required: true
 *                  type: string
 *                  example: Bearer token.....
 *              -   in: formData
 *                  name: title
 *                  description: title of category
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: parent
 *                  description: parent of category
 *                  required: false
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
router.post("/add" ,
            addCategoryValidation(),
            expressValidatorMapper,
            AdminCategoryController.addCategory
);

/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          summary: getparents
 *          description: get category parents
 *          tags: [Admin-Category]
 *          parameters:
 *              -   in: header
 *                  name: authorization
 *                  description: put access token to login
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTExOTQ2MTU2OCIsImlhdCI6MTY5NDI5MDYxNiwiZXhwIjoxNjk0ODk1NDE2fQ.kR0BZZKw1O98eg8ACHhS6OEmerS8o5yTw-w25apzN6o
 *                  required: true
 *                  type: string
 *                  example: Bearer token.....
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
router.get("/parents" ,
            AdminCategoryController.getParents
);

/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *          summary: getparents
 *          description: get category parents
 *          tags: [Admin-Category]
 *          parameters:
 *              -   in: header
 *                  name: authorization
 *                  description: put access token to login
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTExOTQ2MTU2OCIsImlhdCI6MTY5NDI5MDYxNiwiZXhwIjoxNjk0ODk1NDE2fQ.kR0BZZKw1O98eg8ACHhS6OEmerS8o5yTw-w25apzN6o
 *                  required: true
 *                  type: string
 *                  example: Bearer token.....
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
router.get("/children/:parent" ,
            AdminCategoryController.getChilds
);

/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          summary: get allcategories
 *          description: et allcategories
 *          tags: [Admin-Category]
 *          parameters:
 *              -   in: header
 *                  name: authorization
 *                  description: put access token to login
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTExOTQ2MTU2OCIsImlhdCI6MTY5NDI5MDYxNiwiZXhwIjoxNjk0ODk1NDE2fQ.kR0BZZKw1O98eg8ACHhS6OEmerS8o5yTw-w25apzN6o
 *                  required: true
 *                  type: string
 *                  example: Bearer token.....
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
router.get("/all" ,
            AdminCategoryController.getAllCategory
);

/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:
 *          summary: remove category
 *          description: remove category
 *          tags: [Admin-Category]
 *          parameters:
 *              -   in: header
 *                  name: authorization
 *                  description: put access token to login
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTExOTQ2MTU2OCIsImlhdCI6MTY5NDI5MDYxNiwiZXhwIjoxNjk0ODk1NDE2fQ.kR0BZZKw1O98eg8ACHhS6OEmerS8o5yTw-w25apzN6o
 *                  required: true
 *                  type: string
 *                  example: Bearer token.....
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
router.delete("/remove/:id" ,
            AdminCategoryController.removeCategory
);

/**
 * @swagger
 *  /admin/category/get-by-id/{id}:
 *      get:
 *          summary: get category by id
 *          description: get category by id
 *          tags: [Admin-Category]
 *          parameters:
 *              -   in: header
 *                  name: authorization
 *                  description: put access token to login
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTExOTQ2MTU2OCIsImlhdCI6MTY5NDI5MDYxNiwiZXhwIjoxNjk0ODk1NDE2fQ.kR0BZZKw1O98eg8ACHhS6OEmerS8o5yTw-w25apzN6o
 *                  required: true
 *                  type: string
 *                  example: Bearer token.....
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
router.get("/get-by-id/:id" ,
            getCategoryByIdValidation(),
            expressValidatorMapper,
            AdminCategoryController.getCategoryByID
);

/**
 * @swagger
 *  /admin/category/update/{id}:
 *      put:
 *          summary: update category
 *          description: update category
 *          tags: [Admin-Category]
 *          parameters:
 *              -   in: header
 *                  name: authorization
 *                  description: put access token to login
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTExOTQ2MTU2OCIsImlhdCI6MTY5NDI5MDYxNiwiZXhwIjoxNjk0ODk1NDE2fQ.kR0BZZKw1O98eg8ACHhS6OEmerS8o5yTw-w25apzN6o
 *                  required: true
 *                  type: string
 *                  example: Bearer token.....
 *              -   in: path
 *                  name: id
 *                  description: id of category
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: title
 *                  description: title of category
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
router.put("/update/:id" ,
            updateCategoryValidation(),
            expressValidatorMapper,
            AdminCategoryController.editCategory
);

module.exports = {
    adminCategoryRoutes : router,
}
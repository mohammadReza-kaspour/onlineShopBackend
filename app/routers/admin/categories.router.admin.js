const { AdminCategoryController } = require("../../http/controllers/admin/category.controller.admin");
const { expressValidatorMapper } = require("../../http/middlewares/public.middleware");
const { addCategoryValidation } = require("../../http/validations/admin/category.validation.admin");

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

module.exports = {
    adminCategoryRoutes : router,
}
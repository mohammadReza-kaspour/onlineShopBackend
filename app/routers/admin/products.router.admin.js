const { AdminProductController } = require("../../http/controllers/admin/products.controller.admin");
const { parserMiddlewareByCustomField, expressValidatorMapper } = require("../../http/middlewares/public.middleware");
const { addProductValidation, justMongoIDValidator } = require("../../http/validations/admin/products.validation.admin");
const { uploadFile } = require("../../utils/multer.utils");

const router = require("express").Router();
/**
 * @swagger
 *  components:
 *      schemas:
 *          AddProduct:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_desc
 *                  -   total_desc
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   count
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
 *                  count:
 *                      type: string
 *                      description: count of product
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  width:
 *                      type: string
 *                      description: width of product
 *                  height:
 *                      type: string
 *                      description: height of product
 *                  length:
 *                      type: string
 *                      description: length of product
 *                  weight:
 *                      type: string
 *                      description: weight of product
 */

/**
 * tags:
 *  -   name: Admin-Product
 *      description: admin product routes
 */

/**
 * @swagger
 *  /admin/product/add:
 *      post:
 *          summary: add product
 *          description: add products
 *          tags: [Admin-Product]
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/AddProduct"
 *          responses:
 *              200:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              500:
 *                  description: Internal Server Error
 *          
 */
router.post("/add",
            uploadFile.array("images" , 10),
            parserMiddlewareByCustomField("tags",","),
            parserMiddlewareByCustomField("category",","),
            addProductValidation(),
            expressValidatorMapper,
            AdminProductController.addProduct
);

/**
 * @swagger
 *  /admin/product/get-by-id/{id}:
 *      get:
 *          summary: get product by id
 *          description: get product by id
 *          tags: [Admin-Product]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  description: get product by inserted id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              500:
 *                  description: Internal Server Error
 *          
 */
router.get("/get-by-id/:id",
            justMongoIDValidator(),
            expressValidatorMapper,
            AdminProductController.getProductByID
);

/**
 * @swagger
 *  /admin/product/remove/{id}:
 *      delete:
 *          summary: remove product by id
 *          description: remove product by id
 *          tags: [Admin-Product]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  description: remove product by inserted id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              500:
 *                  description: Internal Server Error
 *          
 */
router.delete("/remove/:id",
            justMongoIDValidator(),
            expressValidatorMapper,
            AdminProductController.removeProduct
);

/**
 * @swagger
 *  /admin/product/all:
 *      get:
 *          summary: get all product
 *          description: you can get all product or you can perform search with query
 *          tags: [Admin-Product]
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: text for search in title,short-desc,total-desc
 *          responses:
 *              200:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              500:
 *                  description: Internal Server Error
 */
router.get("/all",
            AdminProductController.getAllProducts
);

module.exports = {
    adminProductRoutes : router,
}
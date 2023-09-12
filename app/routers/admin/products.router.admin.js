const { AdminProductController } = require("../../http/controllers/admin/products.controller.admin");
const { parserMiddlewareByCustomField, expressValidatorMapper } = require("../../http/middlewares/public.middleware");
const { addProductValidation } = require("../../http/validations/admin/products.validation.admin");
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

module.exports = {
    adminProductRoutes : router,
}
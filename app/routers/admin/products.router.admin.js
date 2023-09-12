const { AdminProductController } = require("../../http/controllers/admin/products.controller.admin");
const { parserMiddlewareByCustomField } = require("../../http/middlewares/public.middleware");
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
 *                  image:
 *                      type: file
 *                      description: image of product
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
            uploadFile.single("image"),
            parserMiddlewareByCustomField("tags",","),
            parserMiddlewareByCustomField("category",","),
            AdminProductController.addProduct
);

module.exports = {
    adminProductRoutes : router,
}
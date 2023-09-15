const { AdminProductController } = require("../../http/controllers/admin/products.controller.admin");
const { parserMiddlewareByCustomField, expressValidatorMapper } = require("../../http/middlewares/public.middleware");
const { addProductValidation, justMongoIDValidator, updateProductValidation } = require("../../http/validations/admin/products.validation.admin");
const { uploadFile } = require("../../utils/multer.utils");

const router = require("express").Router();

router.post("/add",
            uploadFile.array("images" , 10),
            parserMiddlewareByCustomField("tags",","),
            parserMiddlewareByCustomField("category",","),
            parserMiddlewareByCustomField("model",","),
            parserMiddlewareByCustomField("colors",","),
            addProductValidation(),
            expressValidatorMapper,
            AdminProductController.addProduct
);
router.get("/get-by-id/:id",
            justMongoIDValidator(),
            expressValidatorMapper,
            AdminProductController.getProductByID
);
router.delete("/remove/:id",
            justMongoIDValidator(),
            expressValidatorMapper,
            AdminProductController.removeProduct
);
router.get("/all",
            AdminProductController.getAllProducts
);
router.put("/update/:id",
            uploadFile.array("images" , 10),
            parserMiddlewareByCustomField("tags",","),
            parserMiddlewareByCustomField("category",","),
            parserMiddlewareByCustomField("model",","),
            parserMiddlewareByCustomField("colors",","),
            updateProductValidation(),
            expressValidatorMapper,
            AdminProductController.editProduct
);

module.exports = {
    adminProductRoutes : router,
}
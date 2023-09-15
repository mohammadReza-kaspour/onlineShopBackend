const { AdminCategoryController } = require("../../http/controllers/admin/category.controller.admin");
const { expressValidatorMapper } = require("../../http/middlewares/public.middleware");
const { addCategoryValidation, getCategoryByIdValidation, updateCategoryValidation } = require("../../http/validations/admin/category.validation.admin");

const router = require("express").Router();

router.post("/add" ,
            addCategoryValidation(),
            expressValidatorMapper,
            AdminCategoryController.addCategory
);
router.get("/parents" ,
            AdminCategoryController.getParents
);
router.get("/children/:parent" ,
            AdminCategoryController.getChilds
);
router.get("/all" ,
            AdminCategoryController.getAllCategory
);
router.delete("/remove/:id" ,
            AdminCategoryController.removeCategory
);
router.get("/get-by-id/:id" ,
            getCategoryByIdValidation(),
            expressValidatorMapper,
            AdminCategoryController.getCategoryByID
);
router.put("/update/:id" ,
            updateCategoryValidation(),
            expressValidatorMapper,
            AdminCategoryController.editCategory
);

module.exports = {
    adminCategoryRoutes : router,
}
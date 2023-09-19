const { AdminRoleController } = require("../../http/controllers/admin/RBAC/roles.controller.admin");
const { expressValidatorMapper, parserMiddlewareByCustomField } = require("../../http/middlewares/public.middleware");
const { addRoleValidation, updateRoleValidation } = require("../../http/validations/admin/roles.validation.admin");

const router = require("express").Router();

router.get("/all",
            AdminRoleController.getAllRoles
);

router.post("/add",
            parserMiddlewareByCustomField("permissions",","),
            addRoleValidation(),
            expressValidatorMapper,
            AdminRoleController.addRole
);
router.delete("/remove/:field",
            AdminRoleController.removeRole
);
router.put("/edit/:roleid",
            parserMiddlewareByCustomField("permissions",","),
            updateRoleValidation(),
            expressValidatorMapper,
            AdminRoleController.editRole
);

module.exports = {
    adminRolesRoutes : router,
}
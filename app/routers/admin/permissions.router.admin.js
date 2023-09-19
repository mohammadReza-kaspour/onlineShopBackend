const { AdminpermissionController } = require("../../http/controllers/admin/RBAC/permissions.controller.admin");
const { expressValidatorMapper } = require("../../http/middlewares/public.middleware");
const { addPermissionValidation, updatedPermissionValidation } = require("../../http/validations/admin/permission.validation.admin");

const router = require("express").Router();

router.get("/all",
            AdminpermissionController.getAllPermissions
);
router.post("/add",
            addPermissionValidation(),
            expressValidatorMapper,
            AdminpermissionController.addPermission
);
router.delete("/remove/:field",
            AdminpermissionController.removePermission
);
router.put("/edit/:permissionid",
            updatedPermissionValidation(),
            expressValidatorMapper,
            AdminpermissionController.editPermission
);


module.exports = {
    adminPermissionRoutes : router,
}
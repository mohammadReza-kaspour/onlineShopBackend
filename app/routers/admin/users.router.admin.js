const { AdminUserController } = require("../../http/controllers/admin/users.controller.user");

const router = require("express").Router();

router.get("/all" , 
            AdminUserController.getAllUsers
);
router.put("/edit-profile" , 
            AdminUserController.updateUserProfile
);



module.exports = {
    adminUserRoutes : router,
}
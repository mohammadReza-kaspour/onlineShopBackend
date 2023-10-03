const { SupportNameSpaceController } = require("../../http/controllers/support/nameSpaces.controller.support");

const router = require("express").Router();

router.post("/add" , 
            SupportNameSpaceController.addNameSpace);
router.get("/get-all" , 
            SupportNameSpaceController.getAllNameSpace);

module.exports = {
    supportNameSpaceRoutes : router,
}
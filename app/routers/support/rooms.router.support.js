const { SupportRoomController } = require("../../http/controllers/support/rooms.controller.support");
const { uploadFile } = require("../../utils/multer.utils");

const router = require("express").Router();

router.post("/add" ,
            uploadFile.single("image"),
            SupportRoomController.addRoom);
router.get("/get-all" , 
            SupportRoomController.getAllRooms);

module.exports = {
    supportRoomRoutes : router,
}
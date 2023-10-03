const { supportNameSpaceRoutes } = require("./nameSpaces.router.support");
const { supportRoomRoutes } = require("./rooms.router.support");

const router = require("express").Router();

router.use("/namespace" , supportNameSpaceRoutes);
router.use("/room" , supportRoomRoutes);

module.exports = {
    supportAllRoutes : router,
}
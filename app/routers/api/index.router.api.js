const { apiHomeRoutes } = require("./home.router.api");
const { apiPaymentsRoutes } = require("./payments.router.api");

const router = require("express").Router();

router.use("/" , apiHomeRoutes); 
router.use("/payment" , apiPaymentsRoutes);

module.exports = {
    apiAllRoutes : router,
}
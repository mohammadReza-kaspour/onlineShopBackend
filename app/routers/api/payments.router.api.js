const { ApiPaymentController } = require("../../http/controllers/api/payments.controller.api");
const { checkAccessTokenToLoggin } = require("../../http/middlewares/public.middleware");

const router = require("express").Router();

router.post("/payment-gateway" ,
            checkAccessTokenToLoggin,
            ApiPaymentController.paymentGateway);
router.get("/verify" , ApiPaymentController.verifyPayment);

module.exports = {
    apiPaymentsRoutes : router,
}
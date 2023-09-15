const { UserAuthController } = require("../../http/controllers/user/auth.controller.user");
const { expressValidatorMapper, checkRefreshTokenToLogin } = require("../../http/middlewares/public.middleware");
const { userGetOTPValidation, userCheckOTPValidation } = require("../../http/validations/user/auth.validation.user");

const router = require("express").Router();

router.post("/get-otp" ,
            userGetOTPValidation() , 
            expressValidatorMapper, 
            UserAuthController.getOTP
);
router.post("/check-otp" ,
            userCheckOTPValidation() , 
            expressValidatorMapper, 
            UserAuthController.checkOTP
);
router.post("/refresh-token" ,
            checkRefreshTokenToLogin,
            UserAuthController.refreshToken
);

module.exports = {
    userAuthRoutes : router,
}
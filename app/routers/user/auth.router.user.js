const { UserAuthController } = require("../../http/controllers/user/auth.controller.user");
const { expressValidatorMapper, checkRefreshTokenToLogin } = require("../../http/middlewares/public.middleware");
const { userGetOTPValidation, userCheckOTPValidation } = require("../../http/validations/user/auth.validation.user");

const router = require("express").Router();
/**
 * tags:
 *  name: User-Authentication
 *  description: user authentication section to resgister and login
 */
/**
 * @swagger
 *  /user/auth/get-otp:
 *      post:
 *          summary: login user in userpanel with phone number
 *          description: OTP login
 *          tags: [User-Authentication]
 *          parameters:
 *          -   name: mobile
 *              description: FA-IRI phone number
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: Unauthorized
 *              500:
 *                  description: Internal Server Error
 */
router.post("/get-otp" ,
            userGetOTPValidation() , 
            expressValidatorMapper, 
            UserAuthController.getOTP
);

/**
 * @swagger
 *  /user/auth/check-otp:
 *      post:
 *          summary: login user in userpanel with phone number
 *          description: OTP login
 *          tags: [User-Authentication]
 *          parameters:
 *          -   name: mobile
 *              description: FA-IRI phone number
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: code
 *              description: otp code
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: Unauthorized
 *              500:
 *                  description: Internal Server Error
 */
router.post("/check-otp" ,
            userCheckOTPValidation() , 
            expressValidatorMapper, 
            UserAuthController.checkOTP
);

/**
 * @swagger
 *  /user/auth/refresh-token:
 *      post:
 *          summary: sign refresh token
 *          description: verify old token to get fresh token
 *          tags: [User-Authentication]
 *          parameters:
 *          -   name: token
 *              description: refresh token
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: Unauthorized
 *              500:
 *                  description: Internal Server Error
 */
router.post("/refresh-token" ,
            checkRefreshTokenToLogin,
            UserAuthController.refreshToken
);

module.exports = {
    userAuthRoutes : router,
}
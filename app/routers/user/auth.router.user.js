const { UserAuthController } = require("../../http/controllers/user/auth.controller.user");
const { expressValidatorMapper, checkRefreshTokenToLogin } = require("../../http/middlewares/public.middleware");
const { userGetOTPValidation, userCheckOTPValidation } = require("../../http/validations/user/auth.validation.user");

const router = require("express").Router();
/**
 * @swagger
 *  components:
 *      schemas:
 *          GetOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: FA-IRI phone number
 *          CheckOTP:
 *              type: object
 *              required: true
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: FA-IRI phone number
 *                  code:
 *                      type: string
 *                      description: otp code
 *          RefreshToken:
 *              type: object
 *              required: true
 *                  -   token
 *              properties:
 *                  token:
 *                      type: string
 *                      description: refresh token
 */

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
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/GetOTP"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/GetOTP"
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
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/CheckOTP"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/CheckOTP"
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
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/RefreshToken"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/RefreshToken"
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
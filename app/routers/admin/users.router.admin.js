const { AdminUserController } = require("../../http/controllers/admin/users.controller.user");

const router = require("express").Router();

router.get("/all" , 
            AdminUserController.getAllUsers
);

/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateUserProfile:
 *              type: object
 *              properties:
 *                  firstName:
 *                      type: string
 *                      description: firstname of user
 *                  lastName:
 *                      type: string
 *                      description: lastname of user
 *                  username:
 *                      type: string
 *                      description: username of user
 *                  email:
 *                      type: string
 *                      description: email of user
 *                  password:
 *                      type: string
 *                      description: password of user
 *                  birthday:
 *                      type: string
 *                      description: birthday of user
 */

/**
 * @swagger
 *  /admin/user/edit-profile:
 *      put:
 *          summary: edit-profile of user
 *          description: edit-profile of user
 *          tags: [Admin-UserController]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/UpdateUserProfile"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/UpdateUserProfile"
 *          responses:
 *              200:
 *                  description: Seccess
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/PublicSuccessDefinition"
 *              400:
 *                  description: Bad Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/PublicErrorDefinition" 
 */
router.put("/edit-profile" , 
            AdminUserController.updateUserProfile
);



module.exports = {
    adminUserRoutes : router,
}
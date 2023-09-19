/////schemas
/**
 * @swagger
 *  components:
 *      schemas:
 *          AddRole:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of role
 *                  description:
 *                      type: string
 *                      description: description of role
 *                  permissions:
 *                      type: array
 *                      description: permission object id
 *          EditRole:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of role
 *                  description:
 *                      type: string
 *                      description: description of role
 *                  permissions:
 *                      type: array
 *                      description: permission object id
 */

/////definitions
/**
 * @swagger
 *  definitions:
 *      GetAllRoles:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              success:
 *                  type: boolean
 *                  example: true
 *              data:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          example: نتیجه مورد نظر شما با موفقیت یافت شد
 *                      data:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: 65037e7579657978b628157c
 *                                  title:
 *                                      type: string
 *                                      example: Admin Role
 *                                  permissions:
 *                                      type: object
 *                                      properties:
 *                                          _id:
 *                                              type: string
 *                                              example: 65037e7579657978b628157c
 *                                          title:
 *                                              type: string
 *                                              example: title of Role
 *                                          description:
 *                                              type: string
 *                                              example: description of Role
 *                                      
 */


/////routers
//add role
/**
 * @swagger
 *  /admin/role/add:
 *      post:
 *          summary: add role
 *          description: add role
 *          tags: [Admin-RBAC]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/AddRole"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/AddRole"
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      applicstion/json:
 *                          schema:
 *                              $ref: "#/definitions/PublicSuccessDefinition"
 *              400:
 *                  description: Bad Request
 *                  content:
 *                      applicstion/json:
 *                          schema:
 *                              $ref: "#/definitions/PublicErrorDefinition"
 */

//edit role
/**
 * @swagger
 *  /admin/role/edit/{roleid}:
 *      put:
 *          summary: edit role
 *          description: edit role
 *          tags: [Admin-RBAC]
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  required: true
 *                  name: roleid
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/EditRole"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/EditRole"
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      applicstion/json:
 *                          schema:
 *                              $ref: "#/definitions/PublicSuccessDefinition"
 *              400:
 *                  description: Bad Request
 *                  content:
 *                      applicstion/json:
 *                          schema:
 *                              $ref: "#/definitions/PublicErrorDefinition"
 */

//get all roles
/**
 * @swagger
 *  /admin/role/all:
 *      get:
 *          summary: get all role
 *          description: get all role
 *          tags: [Admin-RBAC]
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      applicstion/json:
 *                          schema:
 *                              $ref: "#/definitions/GetAllRoles"
 *              400:
 *                  description: Bad Request
 *                  content:
 *                      applicstion/json:
 *                          schema:
 *                              $ref: "#/definitions/PublicErrorDefinition"
 */

//remove role
/**
 * @swagger
 *  /admin/role/remove/{field}:
 *      delete:
 *          summary: remove role
 *          description: remove role
 *          tags: [Admin-RBAC]
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  required: true
 *                  name: field
 *                  description: send id or title of role to remove it
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      applicstion/json:
 *                          schema:
 *                              $ref: "#/definitions/PublicSuccessDefinition"
 *              400:
 *                  description: Bad Request
 *                  content:
 *                      applicstion/json:
 *                          schema:
 *                              $ref: "#/definitions/PublicErrorDefinition"
 */













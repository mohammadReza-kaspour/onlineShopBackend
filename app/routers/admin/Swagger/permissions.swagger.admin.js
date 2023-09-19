/////schemas
/**
 * @swagger
 *  components:
 *      schemas:
 *          AddPermission:
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
 *          EditPermission:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of role
 *                  description:
 *                      type: string
 *                      description: description of role
 */

/////definitions
/**
 * @swagger
 *  definitions:
 *      GetAllPermissions:
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
 *                                      example: title of permission
 *                                  description:
 *                                      type: string
 *                                      example: description of permission
 *                                  
 *                                      
 */


/////routers
//add permission
/**
 * @swagger
 *  /admin/permission/add:
 *      post:
 *          summary: add permission
 *          description: add permission
 *          tags: [Admin-RBAC]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/AddPermission"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/AddPermission"
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

//edit permission
/**
 * @swagger
 *  /admin/permission/edit/{permissionid}:
 *      put:
 *          summary: edit permission
 *          description: edit permission
 *          tags: [Admin-RBAC]
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  required: true
 *                  name: permissionid
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/EditPermission"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/EditPermission"
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

//get all permissions
/**
 * @swagger
 *  /admin/permission/all:
 *      get:
 *          summary: get all permission
 *          description: get all permission
 *          tags: [Admin-RBAC]
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      applicstion/json:
 *                          schema:
 *                              $ref: "#/definitions/GetAllPermissions"
 *              400:
 *                  description: Bad Request
 *                  content:
 *                      applicstion/json:
 *                          schema:
 *                              $ref: "#/definitions/PublicErrorDefinition"
 */

//remove permission
/**
 * @swagger
 *  /admin/permission/remove/{field}:
 *      delete:
 *          summary: remove permission
 *          description: remove permission
 *          tags: [Admin-RBAC]
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  required: true
 *                  name: field
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













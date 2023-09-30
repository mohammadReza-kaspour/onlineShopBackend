/**
 * @swagger
 *  definitions:
 *      PublicSuccessDefinition:
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
 *                          example: any custom message......
 *                      data:
 *                          type: string
 *                          example: any type of data includes objects and arrays
 * 
 *      PublicErrorDefinition:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 400
 *              success:
 *                  type: boolean
 *                  example: true
 *              data:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          example: any custom message......
 */

/**
 * @swagger
 *  tags:
 *      -   name: Api-Payment
 *          description : Api-Payment routes
 *      -   name: Admin-Panel
 *          description : admin panel routes
 *      -   name: Admin-RBAC
 *          description : Role Base Access Controll System
 *      -   name: Admin-UserController
 *          description : user controller routes
 *      -   name: Admin-Course
 *          description : course panel routes  
 *      -   name: Admin-Chapter
 *          description : chapter panel routes
 *      -   name: Admin-Episode
 *          description : Episode panel routes
 *      -   name: Admin-Product
 *          description : Admin-Product routes 
 *      -   name: Admin-Blog
 *          description : Admin-Blog routes 
 *      -   name: Admin-Category
 *          description : Admin-Category routes   
 */
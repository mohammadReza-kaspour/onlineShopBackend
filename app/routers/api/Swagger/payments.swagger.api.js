/**
 * @swagger
 *  /payment/payment-gateway:
 *      post:
 *          summary: payment gateway
 *          description: payment gateway
 *          tags: [Api-Payment]
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref : "#/definitions/PublicSuccessDefinition"
 *              400:
 *                  description: Bad Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref : "#/definitions/PublicErrorDefinition"
 */
/////schemas
/**
 * @swagger
 *  components:
 *      schemas:
 *          AddEpisode:
 *              type: object
 *              required:
 *                  -   title
 *                  -   text
 *                  -   type
 *                  -   video
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of episode
 *                  text:
 *                      type: string
 *                      description: text of episode
 *                  type:
 *                      type: string
 *                      description: type of episode
 *                      enum:
 *                          -   free
 *                          -   cash
 *                          -   vip
 *                  video:
 *                      type: string
 *                      description: video of episode
 *                      format: binary
 */


/////definitions



/////routers
//add episode
/**
 * @swagger
 *  /admin/episode/add-episode/{chapterid}:
 *      put:
 *          summary: add episode
 *          description: add episode with chapter id
 *          tags: [Admin-Episode]
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  required: true
 *                  name: chapterid
 *                  description: chapter id
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/AddEpisode"
 *          responses:
 *              200:
 *                  description: Success
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

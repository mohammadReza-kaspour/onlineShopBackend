const { AdminEpisodeController } = require("../../http/controllers/admin/courses/episodes.controller.admin");
const { expressValidatorMapper } = require("../../http/middlewares/public.middleware");
const { addEpisodeValidation, justMongoIDValidator, updateEpisodeValidation } = require("../../http/validations/admin/episodes.validation.admin");
const { uploadVideo } = require("../../utils/multer.utils");

const router = require("express").Router();

router.put("/add-episode/:chapterid",
            uploadVideo.single("video"),
            addEpisodeValidation(),
            expressValidatorMapper,
            AdminEpisodeController.addEpisode
);

/**
 * @swagger
 *  /admin/episode/remove/{episodeid}:
 *      delete:
 *          summary: delete episode
 *          description: delete episode
 *          tags: [Admin-Episode]
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  required: true
 *                  name: episodeid
 *                  description: valid mongo id of episode
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/PublicSeccessDefinition"
 *              400:
 *                  description: Bad Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/PublicErrorDefinition"
 */
router.delete("/remove/:episodeid",
            justMongoIDValidator("episodeid"),
            expressValidatorMapper,
            AdminEpisodeController.removeEpisode
);

/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateEpisode:
 *              type: object
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

/**
 * @swagger
 *  /admin/episode/edit/{episodeid}:
 *      put:
 *          summary: edit episode
 *          description: edit episode
 *          tags: [Admin-Episode]
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  required: true
 *                  name: episodeid
 *                  description: valid mongo id of episode
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/UpdateEpisode"
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/PublicSeccessDefinition"
 *              400:
 *                  description: Bad Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/PublicErrorDefinition"
 */
router.put("/edit/:episodeid",
            uploadVideo.single("video"),
            updateEpisodeValidation(),
            expressValidatorMapper,
            AdminEpisodeController.updateEpisode
);


module.exports = {
    adminEpisodeRoutes : router,
}
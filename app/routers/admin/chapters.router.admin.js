const { AdminChapterController } = require("../../http/controllers/admin/courses/chapters.controller.admin");
const { expressValidatorMapper } = require("../../http/middlewares/public.middleware");
const { addChapterValidation, justMongoIDValidator } = require("../../http/validations/admin/chapters.validation.admin");

const router = require("express").Router();


router.put("/add-chapter/:id" ,
            addChapterValidation(),
            expressValidatorMapper,
            AdminChapterController.createNewChapter
);

router.get("/get-chapters/:id" ,
            justMongoIDValidator(),
            expressValidatorMapper,
            AdminChapterController.getAllChapters
);

router.get("/get-chapter/:id" ,
            justMongoIDValidator(),
            expressValidatorMapper,
            AdminChapterController.getChapter
);

router.delete("/remove/:id" ,
            justMongoIDValidator(),
            expressValidatorMapper,
            AdminChapterController.removeChapter
);
/**
 * @swagger
 *  components:
 *      schemas:
 *          EditChapter:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of chapter
 *                  text:
 *                      type: string
 *                      description: text of chapter
 */

/**
 * @swagger
 *  /admin/chapter/edit/{id}:
 *      put:
 *          summary: edit chapter
 *          description: edit chapter
 *          tags: [Admin-Chapter]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  description: chapter id
 *                  type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/EditChapter"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/AddChapter"
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

router.put("/edit/:id" ,
            justMongoIDValidator(),
            expressValidatorMapper,
            AdminChapterController.editChapter
);


module.exports = {
    adminChapterRoutes : router,
}
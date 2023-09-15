const { AdminChapterController } = require("../../http/controllers/admin/courses/chapters.controller.admin");
const { expressValidatorMapper } = require("../../http/middlewares/public.middleware");
const { addChapterValidation, justMongoIDValidator } = require("../../http/validations/admin/chapters.validation.admin");

const router = require("express").Router();


router.put("/add-chapter/:id" ,
            addChapterValidation(),
            expressValidatorMapper,
            AdminChapterController.createNewChapter
);

/**
 * @swagger
 *  /admin/chapter/get-chapters/{id}:
 *      get:
 *          summary: get all courses
 *          description: get all courses
 *          tags: [Admin-Chapter]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  description: course id
 *                  type: string
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      applicstion/json:
 *                          schema:
 *                              $ref: "#/definitions/GetChapters"
 *              400:
 *                  description: Bad Request
 *                  content:
 *                      applicstion/json:
 *                          schema:
 *                              $ref: "#/definitions/PublicErrorDefinition"
 */
router.get("/get-chapters/:id" ,
            justMongoIDValidator(),
            expressValidatorMapper,
            AdminChapterController.getAllChapters
);

module.exports = {
    adminChapterRoutes : router,
}
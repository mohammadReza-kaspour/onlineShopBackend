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

/**
 * @swagger
 *  /admin/chapter/remove/{id}:
 *      delete:
 *          summary: remove chapter
 *          description: remove chapter
 *          tags: [Admin-Chapter]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  description: chapter id
 *                  type: string
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
router.delete("/remove/:id" ,
            justMongoIDValidator(),
            expressValidatorMapper,
            AdminChapterController.removeChapter
);


module.exports = {
    adminChapterRoutes : router,
}
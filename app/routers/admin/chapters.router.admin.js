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

router.put("/edit/:id" ,
            justMongoIDValidator(),
            expressValidatorMapper,
            AdminChapterController.editChapter
);


module.exports = {
    adminChapterRoutes : router,
}
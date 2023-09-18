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
router.delete("/remove/:episodeid",
            justMongoIDValidator("episodeid"),
            expressValidatorMapper,
            AdminEpisodeController.removeEpisode
);
router.put("/edit/:episodeid",
            uploadVideo.single("video"),
            updateEpisodeValidation(),
            expressValidatorMapper,
            AdminEpisodeController.updateEpisode
);


module.exports = {
    adminEpisodeRoutes : router,
}
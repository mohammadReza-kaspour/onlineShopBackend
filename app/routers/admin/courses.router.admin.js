const { AdminCourseController } = require("../../http/controllers/admin/courses.controller.admin");
const { expressValidatorMapper, parserMiddlewareByCustomField } = require("../../http/middlewares/public.middleware");
const { addCourseValidation } = require("../../http/validations/admin/courses.validation.admin");
const { uploadFile } = require("../../utils/multer.utils");

const router = require("express").Router();

//router.get();     get all courses
//router.post();     create new course
//router.put();     create new chapter
//router.put();     create new episode
//router.put();     edit course
//router.delete();     delete course
//router.get();     get a course

router.get("/all" , 
            AdminCourseController.getAllCourses
);
router.post("/add-course" ,
            uploadFile.array("images",10),
            parserMiddlewareByCustomField("tags" , ","),
            parserMiddlewareByCustomField("category" , ","),
            addCourseValidation(),
            expressValidatorMapper,
            AdminCourseController.createNewCourse
);
router.get("/get-course/:id" , 
            AdminCourseController.getCourse
);

module.exports = {
    adminCourseRoutes : router,
}
const { AdminCourseController } = require("../../http/controllers/admin/courses/courses.controller.admin");
const { expressValidatorMapper, parserMiddlewareByCustomField } = require("../../http/middlewares/public.middleware");
const { addCourseValidation, addChapterValidation } = require("../../http/validations/admin/courses.validation.admin");
const { uploadFile } = require("../../utils/multer.utils");

const router = require("express").Router();

//router.get();     get all courses             check
//router.post();     create new course          check
//router.put();     create new chapter
//router.put();     create new episode
//router.put();     edit course
//router.delete();     delete course
//router.get();     get a course                check

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
/**
 * @swagger
 *  components:
 *      schemas:
 *          AddChapter:
 *              type: object
 *              required:
 *                  -   title
 *                  -   text
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
 *  /admin/course/add-chapter/{id}:
 *      put:
 *          summary: get all courses
 *          description: get all courses
 *          tags: [Admin-Course]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  description: course id
 *                  type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/AddChapter"
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
router.put("/add-chapter/:id" ,
            addChapterValidation(),
            expressValidatorMapper,
            AdminCourseController.createNewChapter
);

module.exports = {
    adminCourseRoutes : router,
}
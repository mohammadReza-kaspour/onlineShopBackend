const { BlogController } = require("../../http/controllers/admin/blogs.controller.admin");
const { expressValidatorMapper, swaggerFreeObjectFixer , parserMiddlewareByCustomField } = require("../../http/middlewares/public.middleware");
const { createBlogValidation, getBlogByIDValidation, updateBlogValidation } = require("../../http/validations/admin/blogs.validation.admin");
const { uploadFile } = require("../../utils/multer.utils");

const router = require("express").Router();

router.get("/get-all-blogs" , BlogController.getAllBlogs);

router.post("/create" ,
            uploadFile.single("image"),
            parserMiddlewareByCustomField("categories" , ","),
            parserMiddlewareByCustomField("tags" , ","),
            createBlogValidation(),
            expressValidatorMapper,
            BlogController.createBlog
);

router.get("/get-by-id/:id" ,
            getBlogByIDValidation(),
            expressValidatorMapper,
            BlogController.getBlogByID
);

router.delete("/remove/:id" ,
            getBlogByIDValidation(),
            expressValidatorMapper,
            BlogController.deleteBlogByID
);

router.put("/update/:id" ,
            swaggerFreeObjectFixer,
            uploadFile.single("image"),
            parserMiddlewareByCustomField("categories" , ","),
            parserMiddlewareByCustomField("tags" , ","),
            updateBlogValidation(),
            expressValidatorMapper,
            BlogController.updateBlogByID
);

module.exports = {
    adminBlogRoutes : router,
}
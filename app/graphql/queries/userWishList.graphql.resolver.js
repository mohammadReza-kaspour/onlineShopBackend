const { GraphQLString } = require("graphql");
const { checkAccessTokenToLogginGraphql } = require("../middlewares/public.graphql.middleware");
const { blogModel } = require("../../models/blogs.model");
const { productModel } = require("../../models/products.model");
const { courseModel } = require("../../models/courses.model");

const userWishListResolver = {
    type : GraphQLString,
    resolve : async (obj , args , context) => {
        const bookmarks = {};

        const user = await checkAccessTokenToLogginGraphql(context.req , context.res);
        const bookmarkedBlogs = await blogModel.find({bookmarks : user._id});
        const bookmarkedProducts = await productModel.find({bookmarks : user._id});
        const bookmarkedCourses = await courseModel.find({bookmarks : user._id});

        bookmarks["blogs"] = bookmarkedBlogs;
        bookmarks["products"] = bookmarkedProducts;
        bookmarks["courses"] = bookmarkedCourses;

        return(JSON.stringify(bookmarks));
    }
}

module.exports = {
    userWishListResolver,
}
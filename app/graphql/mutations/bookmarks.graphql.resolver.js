const { GraphQLString } = require("graphql");
const { publicResponseType } = require("../typeDefs/public.graphql.type");
const { checkAccessTokenToLogginGraphql } = require("../middlewares/public.graphql.middleware");
const { bookmarkHandler } = require("../utils/bookmarks.graphql.utils");
const { blogModel } = require("../../models/blogs.model");
const { productModel } = require("../../models/products.model");
const { courseModel } = require("../../models/courses.model");

const bookmarkForBlogResolver = {
    type : publicResponseType,
    args : {
        blogID : {type : GraphQLString},
    },
    resolve : async (_ , args , context) => {
        const {blogID} = args;

        const user = await checkAccessTokenToLogginGraphql(context.req , context.res);
        let report = await bookmarkHandler(blogModel , blogID , user);

        return {
            statusCode : report.statusCode,
            success : true,
            message : report.message,
        }
    }
}
const bookmarkForProductResolver = {
    type : publicResponseType,
    args : {
        productID : {type : GraphQLString},
    },
    resolve : async (_ , args , context) => {
        const {productID} = args;

        const user = await checkAccessTokenToLogginGraphql(context.req , context.res);
        let report = await bookmarkHandler(productModel , productID , user);

        return {
            statusCode : report.statusCode,
            success : true,
            message : report.message,
        }
    }
}
const bookmarkForCourseResolver = {
    type : publicResponseType,
    args : {
        courseID : {type : GraphQLString},
    },
    resolve : async (_ , args , context) => {
        const {courseID} = args;

        const user = await checkAccessTokenToLogginGraphql(context.req , context.res);
        let report = await bookmarkHandler(courseModel , courseID , user);

        return {
            statusCode : report.statusCode,
            success : true,
            message : report.message,
        }
    }
}

module.exports = {
    bookmarkForBlogResolver,
    bookmarkForProductResolver,
    bookmarkForCourseResolver
}
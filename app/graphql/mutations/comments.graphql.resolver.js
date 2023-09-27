const { GraphQLString } = require("graphql");
const { createCommentHandler } = require("../utils/comments.graphql.utils");
const { blogModel } = require("../../models/blogs.model");
const { publicResponseType } = require("../typeDefs/public.graphql.type");
const {StatusCodes} = require("http-status-codes");
const { checkAccessTokenToLogginGraphql } = require("../middlewares/public.graphql.middleware");
const { productModel } = require("../../models/products.model");
const { courseModel } = require("../../models/courses.model");

const createCommentForBlogResolver = {
    type : publicResponseType,
    args : {
        comment : {type : GraphQLString},
        blogID : {type : GraphQLString},
        parent : {type : GraphQLString},
    },
    resolve : async (_ , args , context) => {
        const {comment , blogID , parent} = args;
        const user = await checkAccessTokenToLogginGraphql(context.req,context.res);
        await createCommentHandler(blogModel , comment , blogID , parent , user);

        return {
            statusCode : StatusCodes.CREATED,
            success : true,
            message : "کامنت با موفقیت افزوده شد و پس از تایید در سایت منتشر می شود",
        }
        
    }
}
const createCommentForProductResolver = {
    type : publicResponseType,
    args : {
        comment : {type : GraphQLString},
        productID : {type : GraphQLString},
        parent : {type : GraphQLString},
    },
    resolve : async (_ , args , context) => {
        const {comment , productID , parent} = args;
        const user = await checkAccessTokenToLogginGraphql(context.req , context.res);
        await createCommentHandler(productModel , comment , productID , parent , user);

        return {
            statusCode : StatusCodes.CREATED,
            success : true,
            message : "کامنت با موفقیت افزوده شد و پس از تایید در سایت منتشر می شود",
        }
        
    }
}
const createCommentForCourseResolver = {
    type : publicResponseType,
    args : {
        comment : {type : GraphQLString},
        courseID : {type : GraphQLString},
        parent : {type : GraphQLString},
    },
    resolve : async (_ , args , context) => {
        const {comment , courseID , parent} = args;
        const user = await checkAccessTokenToLogginGraphql(context.req,context.res);
        await createCommentHandler(courseModel , comment , courseID , parent , user);

        return {
            statusCode : StatusCodes.CREATED,
            success : true,
            message : "کامنت با موفقیت افزوده شد و پس از تایید در سایت منتشر می شود",
        }
        
    }
}

module.exports = {
    createCommentForBlogResolver,
    createCommentForProductResolver,
    createCommentForCourseResolver,
}
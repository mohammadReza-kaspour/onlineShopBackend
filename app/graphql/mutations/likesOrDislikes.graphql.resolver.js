const { GraphQLString, GraphQLBoolean } = require("graphql");
const { publicResponseType } = require("../typeDefs/public.graphql.type");
const { checkAccessTokenToLogginGraphql } = require("../middlewares/public.graphql.middleware");
const { likeOrDislikeHandler } = require("../utils/likesOrDislikes.graphql.utils");
const { blogModel } = require("../../models/blogs.model");
const { productModel } = require("../../models/products.model");
const { courseModel } = require("../../models/courses.model");

const likesOrDislikesForBlogResolver = {
    type : publicResponseType,
    args : {
        blogID : {type : GraphQLString},
        wantToLike : {type : GraphQLBoolean},
    },
    resolve : async (_ , args , context) => {
        const {wantToLike , blogID} = args;

        const user = await checkAccessTokenToLogginGraphql(context.req , context.res);
        let report = await likeOrDislikeHandler(blogModel , blogID , wantToLike , user);

        return {
            statusCode : report.statusCode,
            success : true,
            message : report.message,
        }
    }
}
const likesOrDislikesForProductResolver = {
    type : publicResponseType,
    args : {
        productID : {type : GraphQLString},
        wantToLike : {type : GraphQLBoolean},
    },
    resolve : async (_ , args , context) => {
        const {wantToLike , productID} = args;

        const user = await checkAccessTokenToLogginGraphql(context.req , context.res);
        let report = await likeOrDislikeHandler(productModel , productID , wantToLike , user);
        
        return {
            statusCode : report.statusCode,
            success : true,
            message : report.message,
        }
    }
}
const likesOrDislikesForCourseResolver = {
    type : publicResponseType,
    args : {
        courseID : {type : GraphQLString},
        wantToLike : {type : GraphQLBoolean},
    },
    resolve : async (_ , args , context) => {
        const {wantToLike , courseID} = args;

        const user = await checkAccessTokenToLogginGraphql(context.req , context.res);
        let report = await likeOrDislikeHandler(courseModel , courseID , wantToLike , user);
        
        return {
            statusCode : report.statusCode,
            success : true,
            message : report.message,
        }
    }
}

module.exports = {
    likesOrDislikesForBlogResolver,
    likesOrDislikesForProductResolver,
    likesOrDislikesForCourseResolver
}
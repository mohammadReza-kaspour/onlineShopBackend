const { GraphQLString } = require("graphql");
const { checkExistModel } = require("../utils/comments.graphql.utils");
const { blogModel } = require("../../models/blogs.model");
const { checkAccessTokenToLogginGraphql } = require("../middlewares/public.graphql.middleware");
const { publicResponseType } = require("../typeDefs/public.graphql.type");
const { createError, badFieldsOrBadValuesFilter } = require("../../utils/functions.utils");
const {StatusCodes} = require("http-status-codes");
const { default: mongoose } = require("mongoose");

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
        await checkExistModel(blogModel,blogID);

        const commentObject = badFieldsOrBadValuesFilter({
            user : user._id,
            comment : comment,
            parent : mongoose.isValidObjectId(parent) ? new mongoose.Types.ObjectId(parent) : undefined,
        } , ["user","comment","parent"]);
        const result = await blogModel.updateOne(
            {_id : blogID},
            {$push : {comments : commentObject}}
        );
        if(result.modifiedCount <= 0) throw createError(400 , "کامنت افزوده نشد");

        return {
            statusCode : StatusCodes.CREATED,
            success : true,
            message : "کامنت با موفقیت افزوده شد و پس از تایید در سایت منتشر می شود",
        }
        
    }
}

module.exports = {
    createCommentForBlogResolver,
}
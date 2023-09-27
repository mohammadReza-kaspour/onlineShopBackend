const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require("graphql");
const { publicCommentType } = require("./public.graphql.type");

const commentType = new GraphQLObjectType({
    name : "commentType",
    fields : {
        _id : {type : GraphQLString},
        user : {type : GraphQLString},
        comment : {type : GraphQLString},
        section : {type : GraphQLString},
        show : {type : GraphQLBoolean},
        parent : {type : GraphQLString},
        createdAt : {type : GraphQLString},
    }
});

module.exports = {
    commentType,
}
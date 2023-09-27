const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require("graphql");
const { publicCommentType } = require("./public.graphql.type");

const commentType = new GraphQLObjectType({
    name : "commentType",
    fields : {
        user : {type : GraphQLString},
        comment : {type : GraphQLString},
        show : {type : GraphQLBoolean},
        parent : {type : publicCommentType},
    }
});

module.exports = {
    commentType,
}
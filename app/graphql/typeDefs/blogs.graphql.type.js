const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { publicUserType, publicCategoryType } = require("./public.graphql.type");
const { commentType } = require("./comments.graphql.type");

const blogType = new GraphQLObjectType({
    name : "blogType",
    fields : {
        _id : {type : GraphQLString},
        author : {type : publicUserType},
        title : {type : GraphQLString},
        text : {type : GraphQLString},
        image : {type : GraphQLString},
        imageURL : {type : GraphQLString},
        tags : {type : new GraphQLList(GraphQLString)},
        category : {type : new GraphQLList(publicCategoryType)},
        comments : {type : new GraphQLList(commentType)},
    }
})

module.exports = {
    blogType,
}
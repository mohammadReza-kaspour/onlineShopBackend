const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { publicAuthorType, publicCategoryType } = require("./public.graphql.type");

const blogType = new GraphQLObjectType({
    name : "blogType",
    fields : {
        _id : {type : GraphQLString},
        author : {type : publicAuthorType},
        title : {type : GraphQLString},
        text : {type : GraphQLString},
        image : {type : GraphQLString},
        imageURL : {type : GraphQLString},
        tags : {type : new GraphQLList(GraphQLString)},
        category : {type : new GraphQLList(publicCategoryType)}
    }
})

module.exports = {
    blogType,
}
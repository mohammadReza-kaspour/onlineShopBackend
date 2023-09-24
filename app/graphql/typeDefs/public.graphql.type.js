const { GraphQLObjectType, GraphQLString } = require("graphql");

const publicAuthorType = new GraphQLObjectType({
    name : "publicAuthorType",
    fields : {
        _id : {type : GraphQLString},
        firstName : {type : GraphQLString},
        lastName : {type : GraphQLString},
    }
});
const publicCategoryType = new GraphQLObjectType({
    name : "publicCategoryType",
    fields : {
        _id : {type : GraphQLString},
        title : {type : GraphQLString},
        parent : {type : GraphQLString},
    }
})

module.exports = {
    publicAuthorType,
    publicCategoryType,
}
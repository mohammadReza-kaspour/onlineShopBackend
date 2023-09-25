const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { publicCategoryType, publicCategoryChildrenType } = require("./public.graphql.type");

const categoryType = new GraphQLObjectType({
    name : "categoryType",
    fields : {
        _id : {type : GraphQLString},
        title : {type : GraphQLString},
        parent : {type : publicCategoryType},
        children : {type : new GraphQLList(publicCategoryChildrenType)},
    }
});

module.exports = {
    categoryType,
}
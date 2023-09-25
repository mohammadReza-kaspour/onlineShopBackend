const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = require("graphql");
const { publicCategoryType, publicFeatureType, publicSupplierType } = require("./public.graphql.type");

const productType = new GraphQLObjectType({
    name : "productType",
    fields : {
        _id : {type : GraphQLString},
        title : {type : GraphQLString},
        short_desc : {type : GraphQLString},
        total_desc : {type : GraphQLString},
        images : {type : new GraphQLList(GraphQLString)},
        imagesURL : {type : new GraphQLList(GraphQLString)},
        tags : {type : new GraphQLList(GraphQLString)},
        category : {type : new GraphQLList(publicCategoryType)},
        price : {type : GraphQLInt},
        discount : {type : GraphQLInt},
        count : {type : GraphQLInt},
        type : {type : GraphQLString},
        format : {type : GraphQLString},
        supplier : {type : publicSupplierType},
        feature : {type : publicFeatureType},
    }
})

module.exports = {
    productType,
}
const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");

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
const publicCategoryChildrenType = new GraphQLObjectType({
    name : "publicCategoryChildrenType",
    fields : {
        _id : {type : GraphQLString},
        title : {type : GraphQLString},
        parent : {type : GraphQLString},
        depth : {type : GraphQLString},
    }
})
const publicFeatureType = new GraphQLObjectType({
    name : "publicFeatureType",
    fields : {
        length : {type : GraphQLString},
        height : {type : GraphQLString},
        width : {type : GraphQLString},
        weight : {type : GraphQLString},
        colors : {type : new GraphQLList(GraphQLString)},
        model : {type : new GraphQLList(GraphQLString)},
        madeIn : {type : GraphQLString}, 
    }
})
const publicSupplierType = new GraphQLObjectType({
    name : "publicSupplierType",
    fields : {
        _id : {type : GraphQLString},
        firstName : {type : GraphQLString},
        lastName : {type : GraphQLString},
    }
})
const publicEpisodeType = new GraphQLObjectType({
    name : "publicEpisodeType",
    fields : {
        _id : {type : GraphQLString},
        title : {type : GraphQLString},
        text: {type : GraphQLString},
        type : {type : GraphQLString},
        time: {type : GraphQLString},
        videoAddress : {type : GraphQLString},
    }
})
const publicChapterType = new GraphQLObjectType({
    name : "publicChapterType",
    fields : {
        _id : {type : GraphQLString},
        title : {type : GraphQLString},
        text: {type : GraphQLString},
        episodes : {type : new GraphQLList(publicEpisodeType)},
    }
})


module.exports = {
    publicAuthorType,
    publicCategoryType,
    publicFeatureType,
    publicSupplierType,
    publicCategoryChildrenType,
    publicChapterType
}
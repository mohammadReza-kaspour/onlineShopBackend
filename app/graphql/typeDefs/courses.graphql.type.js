const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require("graphql");
const { publicCategoryType, publicUserType, publicChapterType } = require("./public.graphql.type");
const { commentType } = require("./comments.graphql.type");

const courseType = new GraphQLObjectType({
    name : "courseType",
    fields : {
        _id : {type : GraphQLString},
        title : {type : GraphQLString},
        short_desc : {type : GraphQLString},
        total_desc : {type : GraphQLString},
        images : {type : new GraphQLList(GraphQLString)},
        tags : {type : new GraphQLList(GraphQLString)}, 
        category : {type : new GraphQLList(publicCategoryType)},
        price : {type : GraphQLInt},
        discount : {type : GraphQLInt},
        status : {type : GraphQLString},
        type : {type : GraphQLString },
        supplier : {type : publicUserType},
        students : {type : new GraphQLList(publicUserType)},
        chapters : {type : new GraphQLList(publicChapterType)},
        comments : {type : new GraphQLList(commentType)},
    }
})

module.exports = {
    courseType,
}
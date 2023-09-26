const { GraphQLList } = require("graphql");
const { blogType } = require("../typeDefs/blogs.graphql.type");
const { blogModel } = require("../../models/blogs.model");

const blogResolver = {
    type : new GraphQLList(blogType),
    resolve : async (obj , args , context , info) => {
        return await blogModel.aggregate([
            {
                $match : {},
            },{
                $lookup : {
                    from : "users",
                    localField : "author",
                    foreignField : "_id",
                    as : "author",
                }
            },{
                $unwind : "$author",
            },{
                $lookup : {
                    from : "categories",
                    localField : "category",
                    foreignField : "_id",
                    as : "category",
                }
            }
        ])
    },
}

module.exports = {
    blogResolver,
}
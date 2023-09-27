const { GraphQLList, GraphQLString } = require("graphql");
const { blogType } = require("../typeDefs/blogs.graphql.type");
const { blogModel } = require("../../models/blogs.model");
const { default: mongoose } = require("mongoose");

const blogResolver = {
    type : new GraphQLList(blogType),
    args : {
        id : {type : GraphQLString},
        category : {type : GraphQLString},
    },
    resolve : async (obj , args , context , info) => {
        const searchTemplate1 = args?.id ? {_id : new mongoose.Types.ObjectId(args.id)} : {};
        const searchTemplate2 = args?.category ? {category : new mongoose.Types.ObjectId(args.category)} : {};
        const result= await blogModel.aggregate([
            {
                $match : {
                    $and : [
                        searchTemplate1,
                        searchTemplate2,
                    ]
                }
            },{
                $lookup : {
                    from : "users",
                    localField : "author",
                    foreignField : "_id",
                    as : "author",
                }
            },{
                $unwind : {
                    path : "$author",
                    preserveNullAndEmptyArrays : true
                },
            },{
                $lookup : {
                    from : "categories",
                    localField : "category",
                    foreignField : "_id",
                    as : "category",
                }
            },
            {
                $lookup : {
                    from : "comments",
                    localField : "comments",
                    foreignField : "_id",
                    as : "comments",
                }
            },
        ])
        return result
    },
}

module.exports = {
    blogResolver,
}
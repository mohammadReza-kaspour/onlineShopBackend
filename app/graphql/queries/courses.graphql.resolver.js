const { GraphQLList, GraphQLString } = require("graphql");
const { courseModel } = require("../../models/courses.model");
const { courseType } = require("../typeDefs/courses.graphql.type");
const { default: mongoose } = require("mongoose");

const courseResolver = {
    type : new GraphQLList(courseType),
    args : {
        id : {type : GraphQLString},
        category : {type : GraphQLString},
    },
    resolve : async (_,args) => {
        const searchTemplate1 = args?.id ? {_id : new mongoose.Types.ObjectId(args.id)} : {};
        const searchTemplate2 = args?.category ? {category : new mongoose.Types.ObjectId(args.category)} : {};

        return courseModel.aggregate([
            {
                $match : {
                    $and : [
                        searchTemplate1,
                        searchTemplate2,
                    ]
                }
            },
            {
                $lookup : {
                    from : "users",
                    localField : "supplier",
                    foreignField : "_id",
                    as : "supplier"
                }
            },
            {
                $unwind : {
                    path : "$supplier",
                    preserveNullAndEmptyArrays : true
                }
            },
            {
                $lookup : {
                    from : "users",
                    localField : "students",
                    foreignField : "_id",
                    as : "students"
                }
            },
            {
                $lookup : {
                    from : "categories",
                    localField : "category",
                    foreignField : "_id",
                    as : "category"
                }
            },
        ])
    }
}

module.exports = {
    courseResolver,
}
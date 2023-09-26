const { GraphQLList, GraphQLString } = require("graphql");
const { courseModel } = require("../../models/courses.model");
const { courseType } = require("../typeDefs/courses.graphql.type");
const { default: mongoose } = require("mongoose");

const courseResolver = {
    type : new GraphQLList(courseType),
    args : {
        id : {type : GraphQLString},
    },
    resolve : async (_,args) => {
        let searchTemplate = {}
        if(args.id) searchTemplate = {_id : new mongoose.Types.ObjectId(args.id)};
        return courseModel.aggregate([
            {
                $match : searchTemplate
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
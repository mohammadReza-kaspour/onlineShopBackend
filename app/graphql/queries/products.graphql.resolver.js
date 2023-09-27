const { GraphQLList, GraphQLString } = require("graphql");
const { productType } = require("../typeDefs/products.graphql.type");
const { productModel } = require("../../models/products.model");
const { default: mongoose } = require("mongoose");

const productResolver = {
    type : new GraphQLList(productType),
    args : {
        id : {type : GraphQLString},
        category : {type : GraphQLString},
    },
    resolve : async () => {
        const searchTemplate1 = args?.id ? {_id : new mongoose.Types.ObjectId(args.id)} : {};
        const searchTemplate2 = args?.category ? {category : new mongoose.Types.ObjectId(args.category)} : {};
        return await productModel.aggregate([
            {
                $match : {
                    $and : [
                        searchTemplate1,
                        searchTemplate2,
                    ]
                }
            },{
                $lookup : {
                    from : "categories",
                    localField : "category",
                    foreignField : "_id",
                    as : "category",
                }
            },{
                $lookup : {
                    from : "users",
                    localField : "supplier",
                    foreignField : "_id",
                    as : "supplier",
                }
            },{
                $unwind : "$supplier",
            },{
                $lookup : {
                    from : "comments",
                    localField : "comments",
                    foreignField : "_id",
                    as : "comments",
                }
            },
        ]);
    }
}

module.exports = {
    productResolver,
}
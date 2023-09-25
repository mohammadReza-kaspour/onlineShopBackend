const { GraphQLList } = require("graphql");
const { productType } = require("../typeDefs/products.graphql.type");
const { productModel } = require("../../models/products.model");

const productResolver = {
    type : new GraphQLList(productType),
    resolve : async () => {
        return await productModel.aggregate([
            {
                $match : {}
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
            }
        ]);
    }
}

module.exports = {
    productResolver,
}
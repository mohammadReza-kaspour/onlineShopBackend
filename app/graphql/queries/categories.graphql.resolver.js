const { GraphQLList, GraphQLString } = require("graphql");
const { categoryModel } = require("../../models/categories.model");
const { categoryType } = require("../typeDefs/categories.graphql.type");
const { default: mongoose } = require("mongoose");

const categoryResolver = {
    type : new GraphQLList(categoryType),
    args : {
        id : {type : GraphQLString},
    },
    resolve : async (obj , args , context , info) => {
        const {id} = args;
        let searchTemplate = {parent : undefined}
        if(id) searchTemplate = {_id : new mongoose.Types.ObjectId(id)}
        
        const result =  await categoryModel.aggregate([
            {
                $lookup : {
                    from : "categories",
                    localField : "parent",
                    foreignField : "_id",
                    as : "parent"
                }
            },
            {
                $unwind : {
                    path : "$parent",
                    preserveNullAndEmptyArrays : true 
                    // to not delete null or emptey parent result to use in next stage
                }
                
            },
            {
                $graphLookup : {
                    from : "categories",
                    startWith : "$_id",
                    connectFromField : "_id",
                    connectToField : "parent",
                    depthField : "depth",
                    as : "children"
                }
            },
            {
                $match : searchTemplate
            },
            
        ]);
        return result;
    }
}

module.exports = {
    categoryResolver,
}
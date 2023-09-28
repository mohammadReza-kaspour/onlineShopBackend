const { GraphQLString } = require("graphql");
const { publicResponseType } = require("../typeDefs/public.graphql.type");
const { productModel } = require("../../models/products.model");
const { courseModel } = require("../../models/courses.model");
const { checkAccessTokenToLogginGraphql } = require("../middlewares/public.graphql.middleware");
const { addToBasketHandler, removeFromBasketHandler } = require("../utils/basket.graphql.utils");

const AddToBasketResolver = {
    type : publicResponseType,
    args : {
        targetID : {type : GraphQLString},
        productOrCourse : {type : GraphQLString}, //product - course
    },
    resolve : async (obj , args , context , info) => {
        const {productOrCourse , targetID} = args;

        const model = productOrCourse.toLowerCase().includes("p") ? productModel : courseModel;
        const type = productOrCourse.toLowerCase().includes("p") ? "product" : "course";
        const user = await checkAccessTokenToLogginGraphql(context.req,context.res);

        let report = await addToBasketHandler(model , targetID , user , type);

        return {
            statusCode : report.statusCode,
            success : true,
            message : report.message,
        }
    }
}
const removeFromBasketResolver = {
    type : publicResponseType,
    args : {
        targetID : {type : GraphQLString},
        productOrCourse : {type : GraphQLString}, //product - course
    },
    resolve : async (obj , args , context , info) => {
        const {productOrCourse , targetID} = args;

        const model = productOrCourse.toLowerCase().includes("p") ? productModel : courseModel;
        const type = productOrCourse.toLowerCase().includes("p") ? "product" : "course";
        const user = await checkAccessTokenToLogginGraphql(context.req,context.res);

        let report = await removeFromBasketHandler(model , targetID , user , type);

        return {
            statusCode : report.statusCode,
            success : true,
            message : report.message,
        }
    }
}

module.exports = {
    AddToBasketResolver,
    removeFromBasketResolver
}
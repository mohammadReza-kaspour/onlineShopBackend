const { GraphQLString } = require("graphql");
const { checkAccessTokenToLogginGraphql } = require("../middlewares/public.graphql.middleware");
const { blogModel } = require("../../models/blogs.model");
const { productModel } = require("../../models/products.model");
const { courseModel } = require("../../models/courses.model");
const { AnyType } = require("../typeDefs/public.graphql.type");
const { userModel } = require("../../models/users.model");

const userWishListResolver = {
    type : AnyType,
    resolve : async (obj , args , context) => {
        const bookmarks = {};

        const user = await checkAccessTokenToLogginGraphql(context.req , context.res);
        const bookmarkedBlogs = await blogModel.find({bookmarks : user._id});
        const bookmarkedProducts = await productModel.find({bookmarks : user._id});
        const bookmarkedCourses = await courseModel.find({bookmarks : user._id});

        bookmarks["blogs"] = bookmarkedBlogs;
        bookmarks["products"] = bookmarkedProducts;
        bookmarks["courses"] = bookmarkedCourses;

        return(JSON.stringify(bookmarks));
    }
}
const userBasketResolver = {
    type : AnyType,
    resolve : async (obj , args , context) => {
        const user = await checkAccessTokenToLogginGraphql(context.req,context.res);
        const result = await userModel.aggregate([
            {
                $match : {_id : user._id}
            },
            {
                $project : {
                    basket : 1,
                }
            },
            {
                $lookup : {
                    from : "products",
                    localField : "basket.products.productID",
                    foreignField : "_id",
                    as : "productDetail"
                }
            },
            {
                $lookup : {
                    from : "courses",
                    localField : "basket.courses.courseID",
                    foreignField : "_id",
                    as : "courseDetail"
                }
            },
            {
                $addFields : {
                    "productDetail" : {
                        $function : {
                            lang : "js",
                            args : ["$productDetail" , "$basket.products"],
                            body : function(productDetail , products){
                                return productDetail.map(item => {
                                    const count = products.find(i =>i.productID.toString() === item._id.toString()).count
                                    return {
                                        ...item,
                                        count : count,
                                        totalPrice : count * item.price,
                                        finalPrice : count * (item.price * .01 *(100-item.discount)),
                                    }
                                })
                            }
                        }
                    }
                }
            },
            {
                $addFields : {
                    "courseDetail" : {
                        $function : {
                            lang : "js",
                            args : ["$courseDetail"],
                            body : function(courseDetail){
                                return courseDetail.map(item => {
                                    return {
                                        ...item,
                                        finalPrice : item.price * .01 *(100-item.discount),
                                    }
                                })
                            }
                        }
                    }
                }
            },
            {
                $project : {basket : 0}
            }
        ])

        return result;
    }
}

module.exports = {
    userWishListResolver,
    userBasketResolver,
}
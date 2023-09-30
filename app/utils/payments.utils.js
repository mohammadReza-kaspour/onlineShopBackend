const { userModel } = require("../models/users.model");
const { createError } = require("./functions.utils");
const { StatusCodes } = require("http-status-codes");
const moment = require("moment-jalali");


const getUserBasket = async (user) => await userModel.aggregate([
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
        $addFields : {
            "payDetail" : {
                $function : {
                    lang : "js",
                    args : ["$productDetail" , "$courseDetail" , "$basket.products"],
                    body : function(productDetail , courseDetail , products){
                        const productAmount = productDetail.reduce((total , item) => {
                            return total + item.finalPrice
                        },0);
                        const courseAmount = courseDetail.reduce((total , item) => {
                            return total + item.finalPrice
                        },0);

                        const courseIDS = courseDetail.map(item => item._id.toString());
                        const productIDS = productDetail.map(item => item._id.toString());

                        return {
                            productAmount,
                            courseAmount,
                            paymentAmount : productAmount + courseAmount,
                            productIDS,
                            courseIDS,

                        }
                    }
                }
            }
        }
    },
    {
        $project : {basket : 0}
    }
])
const checkIfEmptyBasket = (user) => {
    if(user?.basket?.courses?.length <= 0 && user?.basket?.products?.length <= 0){
        throw createError(StatusCodes.BAD_REQUEST , "سبد خرید شما خالی می باشد");
    }
}
const checkReadyToPay = (basket) => {
    if(!basket?.payDetail?.paymentAmount){
        throw createError(StatusCodes.BAD_REQUEST , "مشخصات پرداخت آماده نمیباشد");
    }
}
const invoiceNumberGenerator = () => {
    return moment().format("jYYYYjMMjDDHHmmssSSS") + String(process.hrtime()[1]).padStart(9);
}
const DBUpdaterAfterVerifyPayment = async (userModel , productModel , courseModel , paymentModel , authority) => {
    const payment = await paymentModel.findOne({authority});
    const user = await userModel.findOne({_id : payment.user})

    const userBasketUpdater = {
        "basket.products" : [],
        "basket.courses" : [],
        "products" : [...user.products , ...user.basket.products],
        "courses" : [...user.courses , ...user.basket.courses],
    }
    const userUpdate = await userModel.updateOne(
        {_id : payment.user},
        {$set : userBasketUpdater}
    );
    if(userUpdate.modifiedCount <= 0) throw createError(StatusCodes.INTERNAL_SERVER_ERROR,"خطا در به روز رسانی اطلاعات دیتابیس");
    
    for(const product of user.basket.products){
        console.log(product);
        const productUpdate = await productModel.updateOne(
            {_id : product.productID},
            {
                $inc : {count : -Number(product.count)}
            }
        );
        if(productUpdate.modifiedCount <= 0) throw createError(StatusCodes.INTERNAL_SERVER_ERROR,"1خطا در به روز رسانی اطلاعات دیتابیس");
    }

    for(const course of user.basket.courses){
        console.log(course);
        const courseUpdate = await courseModel.updateOne(
            {_id : course.courseID},
            {
                $inc : {count : -Number(course.count)}
            }
        );
        if(courseUpdate.modifiedCount <= 0) throw createError(StatusCodes.INTERNAL_SERVER_ERROR,"2خطا در به روز رسانی اطلاعات دیتابیس");
    }
}

module.exports = {
    getUserBasket,
    checkIfEmptyBasket,
    checkReadyToPay,
    invoiceNumberGenerator,
    DBUpdaterAfterVerifyPayment
}
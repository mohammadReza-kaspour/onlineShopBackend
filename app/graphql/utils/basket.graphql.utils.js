const { default: mongoose } = require("mongoose");
const { createError } = require("../../utils/functions.utils");
const { StatusCodes } = require("http-status-codes");
const { userModel } = require("../../models/users.model");

const checkExistModel = async (model , id) => {
    if(!mongoose.isValidObjectId(id)) throw createError(400 , "شناسه وارد شده صحیح نمیباشد");
    const result = await model.findOne({_id:id});
    if(!result) throw createError(400 , "موردی در دیتابیس یافت نشد");
    return result;
}
const isInBasket = async (targetID , user , type) => {
    const searchTemp = type === "product" ? {"basket.products.productID" : targetID} : {"basket.courses.courseID" : targetID};
    const result = await userModel.findOne({
        _id : user._id,
        ...searchTemp
    })
    return result;
}
const addToBasketHandler = async (targetModel , targetID , user , type) => {
    let report = createError(StatusCodes.OK , "OK");
    targetID = new mongoose.Types.ObjectId(targetID);

    await checkExistModel(targetModel,targetID);
    const inBasket = await isInBasket(targetID , user , type);
    const searchTemp = type === "product" ? {"basket.products.productID" : targetID} : {"basket.courses.courseID" : targetID};
    const incTemp = type === "product" ? {"basket.products.$.count" : 1} : {"basket.courses.$.count" : 1};
    const addTemp = type === "product" ? {"basket.products" : {productID:targetID,count:1}}:
                                         {"basket.courses" : {courseID:targetID,count:1}};
    if(inBasket && type === "course") return report = createError(StatusCodes.BAD_REQUEST , "این دوره قبلا اضافه شده است");
    if(inBasket){
        const result = await userModel.updateOne(
            {
                _id : user._id,
                ...searchTemp
            },{
                $inc : incTemp
            }
        );
        if(result.modifiedCount <= 0) report = createError(StatusCodes.INTERNAL_SERVER_ERROR , "سبد خرید به روز نشد");
        else report = createError(StatusCodes.OK , "سبد خرید به روز شد");
    }else{
        const result = await userModel.updateOne(
            {
                _id : user._id,
            },{
                $push : addTemp,
            }
        );
        if(result.modifiedCount <= 0) report = createError(StatusCodes.INTERNAL_SERVER_ERROR , "سبد خرید به روز نشد");
        else report = createError(StatusCodes.OK , "سبد خرید به روز شد");
    }



    return report
}
const getCount = (data , targetID , type) => {
    const searchTemp = type === "product" ? "products" : "courses";
    const IDTemp = type === "product" ? "productID" : "courseID";
    if(!data) return 0;
    const items = data.basket[searchTemp];
    const item = items.find(element => element[IDTemp].toString() === targetID.toString())
    return item.count ? item.count : 0;
}
const removeFromBasketHandler = async (targetModel , targetID , user , type) => {
    let report = createError(StatusCodes.OK , "OK");
    targetID = new mongoose.Types.ObjectId(targetID);

    await checkExistModel(targetModel,targetID);
    const inBasket = await isInBasket(targetID , user , type);
    const searchTemp = type === "product" ? {"basket.products.productID" : targetID} : {"basket.courses.courseID" : targetID};
    const incTemp = type === "product" ? {"basket.products.$.count" : -1} : {"basket.courses.$.count" : -1};
    const count = getCount(inBasket , targetID , type);
    const removeTemp = type === "product" ? {"basket.products" : {productID:targetID,count:1}}:
                                         {"basket.courses" : {courseID:targetID,count:1}};

    if(inBasket){
        if(count > 1){
            const result = await userModel.updateOne(
                {
                    _id : user._id,
                    ...searchTemp
                },{
                    $inc : incTemp
                }
            );
            if(result.modifiedCount <= 0) report = createError(StatusCodes.INTERNAL_SERVER_ERROR , "سبد خرید به روز نشد");
            else report = createError(StatusCodes.OK , "سبد خرید به روز شد");
        }else{
            const result = await userModel.updateOne(
                {
                    _id : user._id,
                    ...searchTemp
                },{
                    $pull : removeTemp
                }
            );
            if(result.modifiedCount <= 0) report = createError(StatusCodes.INTERNAL_SERVER_ERROR , "سبد خرید به روز نشد");
            else report = createError(StatusCodes.OK , "سبد خرید به روز شد");
        }
    }else{
        report = createError(StatusCodes.BAD_REQUEST , "محصول در سبد خرید موجود نمیباشد");
    }



    return report
}

module.exports = {
    addToBasketHandler,
    removeFromBasketHandler,
}


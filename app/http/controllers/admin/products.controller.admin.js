const { default: mongoose } = require("mongoose");
const { productModel } = require("../../../models/products.model");
const { badFieldsOrBadValuesFilter, createError, copyObject } = require("../../../utils/functions.utils");
const { createTypeAndFeature, addImageToDataIfExists } = require("../../../utils/products.utils");

class AdminProductController {
    addProduct = async (req , res , next) => {
        try {
            let data = {};
            const validFields = [
                "title", 
                "short_desc", 
                "total_desc",
                "tags",
                "category",
                "count",
                "discount",
                "price",
                "weight",
                "width",
                "height",
                "length",
            ];

            data = createTypeAndFeature(copyObject(req.body) ,["weight","width","height","length","colors","model","madeIn"])
            data = addImageToDataIfExists(data , req);
            data.supplier = req.user._id;
            data = badFieldsOrBadValuesFilter(data , validFields.concat(["supplier","feature","images","type"]));
            
            const result = await productModel.create({...data});
            if(!result) throw createError(500 , "محصول مورد نظر اضافه نشد خطا در سیستم");
            
            res.status(200).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "محصول شما با موفقیت اضافه شده",
                    data : {
                        result
                    }
                }
            })
        } catch (error) {
            next(error)
        }
    }
    editProduct = async (req , res , next) => {
        try {
            let data = {};
            const validFields = [
                "title", 
                "short_desc", 
                "total_desc",
                "tags",
                "category",
                "count",
                "discount",
                "price",
                "weight",
                "width",
                "height",
                "length",
                "colors",
                "model",
                "madeIn",
            ];

            data = createTypeAndFeature(copyObject(req.body) ,["weight","width","height","length","colors","model","madeIn"])
            data = addImageToDataIfExists(data , req);
            data.supplier = req.user._id;
            data = badFieldsOrBadValuesFilter(data , validFields.concat(["supplier","feature","images","type"]));
            
            const result = await productModel.findOneAndUpdate(
                {
                    _id : new mongoose.Types.ObjectId(req.params.id),
                },
                {
                    $set : data,
                }
            );
            if(!result) throw createError(500 , "محصول مورد نظر یافت نشد");

            res.status(200).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "محصول مورد نظر به روز رسانی شد",
                    data : {
                        result
                    }
                }
            })
        } catch (error) {
            next(error)
        }
    }
    removeProduct = async (req , res , next) => {
        try {
            const result = await productModel.findOneAndDelete({
                _id : new mongoose.Types.ObjectId(req.params.id),
            })
            if(!result) throw createError(400 , "محصول مورد نظر یافت نشد");

            res.status(200).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "hi",
                    data : {
                        result
                    }
                }
            })
        } catch (error) {
            next(error)
        }
    }
    getAllProducts = async (req , res , next) => {
        try {
            const search = req?.query?.search ?? null;
            let result = [];
            if(search){
                result = await productModel.find(
                    {
                        $text : {
                            $search : search,
                        }
                    }
                );
            }else{
                result = await productModel.find({});
            }
            if(result.length <= 0) throw createError(400 , "محصولی یافت نشد")

            res.status(200).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "محصولات شما یافت شد",
                    data : {
                        result
                    }
                }
            })
        } catch (error) {
            next(error)
        }
    }
    getProductByID = async (req , res , next) => {
        try {
            const result = await productModel.findOne({
                _id : new mongoose.Types.ObjectId(req.params.id),
            })
            if(!result) throw createError(400 , "محصول مورد نظر یافت نشد");

            res.status(200).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "hi",
                    data : {
                        result,
                    }
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    AdminProductController : new AdminProductController()
}
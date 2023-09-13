const { default: mongoose } = require("mongoose");
const { productModel } = require("../../../models/products.model");
const { badFieldsOrBadValuesFilter, createError } = require("../../../utils/functions.utils");

class AdminProductController {
    addProduct = async (req , res , next) => {
        try {
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

            let data = badFieldsOrBadValuesFilter(req.body , validFields);

            if(req.files.length > 0) data.images = req.files.map(item => item.path);
            data.supplier = req.user._id;
            
            ((featureFields) => {
                let featureValue = [];
                let feature = {};
                let type = "virtual";
                featureFields.forEach(item => featureValue.push(!!data[item]?data[item]:""));
                
                for(let i=0; i< featureFields.length; i++) feature[featureFields[i]] = featureValue[i];
                data.feature = badFieldsOrBadValuesFilter(feature , featureFields);
                
                if(Object.keys(data.feature).length > 0) type = "physical"
                data.type = type
                
            })(["weight","width","height","length"])
            
            const result = await productModel.create({...data});
            if(!result) throw createError(500 , "محصول مورد اضافه نشد خطا در سیستم");
            
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
            
            res.status(200).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "hi",
                    data : {}
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
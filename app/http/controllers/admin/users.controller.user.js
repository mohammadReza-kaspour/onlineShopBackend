const { userModel } = require("../../../models/users.model");
const {StatusCodes} = require("http-status-codes");
const { copyObject, badFieldsOrBadValuesFilter, createError } = require("../../../utils/functions.utils");

class AdminUserController {
    getAllUsers = async (req , res , next) => {
        try {
            const search = req?.query?.search?.trim();
            
            const matchObject = {}
            if(search) matchObject["$text"] = {$search : search};
            const users = await userModel.find(matchObject);

            res.status(StatusCodes.OK).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "hi",
                    data : {
                        users
                    }
                }
            })
        } catch (error) {
            next(error)
        }
    }
    updateUserProfile = async (req , res , next) => {
        try {
            const id = req.user._id;
            let data = copyObject(req.body);
            const validFields = [
                "firstName","lastName","username","email","password","birthday"
            ];

            data = badFieldsOrBadValuesFilter(data , validFields);
            const result = await userModel.updateOne({_id:id} , {$set: data});
            if(result.modifiedCount <= 0) throw createError(StatusCodes.INTERNAL_SERVER_ERROR,"به روز رسانی انجام نشد");

            res.status(StatusCodes.OK).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "به روز رسانی با موفقیت انجام شد",
                }
            })
        } catch (error) {
            next(error)
        }
    }
}


module.exports = {
    AdminUserController : new AdminUserController()
}
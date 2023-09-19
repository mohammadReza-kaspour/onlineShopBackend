const {StatusCodes} = require("http-status-codes");
const { roleModel } = require("../../../../models/roles.model");
const { copyObject, createError, badFieldsOrBadValuesFilter } = require("../../../../utils/functions.utils");
const { default: mongoose } = require("mongoose");

class AdminRoleController {
    getAllRoles = async (req , res , next) => {
        try {
            const roles = await roleModel.aggregate([
                {
                    $match : {}
                },{
                    $lookup : {
                        from : "premissions",
                        localField : "permissions",
                        foreignField : "_id",
                        as : "permissions"
                    }
                }
            ]);

            res.status(StatusCodes.OK).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "لیست نقش ها دریافت شد",
                    data : {
                        roles,
                    }
                }
            })
        } catch (error) {
            next(error)
        }
    }
    addRole = async (req , res , next) => {
        try {
            const {title , description , permissions} = req.body;
            await this.#findRoleByTitle(title);
            const result = await roleModel.create({title , description , permissions});
            if(!result) throw createError(StatusCodes.INTERNAL_SERVER_ERROR,"نقش ایجاد نشد");

            res.status(StatusCodes.OK).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "نقش با موفقیت ایجاد شد",
                }
            })
        } catch (error) {
            next(error)
        }
    }
    editRole = async (req , res , next) => {
        try {
            const roleID = new mongoose.Types.ObjectId(req.params.roleid);
            let data = copyObject(req.body);
            data = badFieldsOrBadValuesFilter(data , ["title","description","permissions"]);

            const role = await this.#findRoleByTitleOrID(roleID);
            const result = await roleModel.updateOne(
                {_id : role._id},
                {$set : data}
            );
            if(result.modifiedCount <= 0) throw createError(StatusCodes.INTERNAL_SERVER_ERROR,"نقش به روز رسانی نشد");

            res.status(StatusCodes.OK).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "نقش با موفقیت به روز رسانی شد",
                }
            })
        } catch (error) {
            next(error)
        }
    }
    removeRole = async (req , res , next) => {
        try {
            const {field} = req.params;

            const role = await this.#findRoleByTitleOrID(field);
            const result = await roleModel.deleteOne({_id:role._id});
            if(result.deletedCount <= 0) throw createError(StatusCodes.INTERNAL_SERVER_ERROR,"نقش حذف نشد");
            

            res.status(StatusCodes.OK).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "نقش با موفقیت حذف شد",
                }
            })
        } catch (error) {
            next(error)
        }
    }
    #findRoleByTitle = async (title) => {
        const role = await roleModel.findOne({title});
        if(role) throw createError(StatusCodes.BAD_REQUEST , "نقش با این عنوان قبلا ذخیره شده است");
    }
    #findRoleByTitleOrID = async (field) => {
        let searchPattern = mongoose.isValidObjectId(field) ? {_id:field} : {title:field.trim()};
        const result = await roleModel.findOne(searchPattern);
        if(!result) throw createError(StatusCodes.BAD_REQUEST , "متاسفانه نقش مورد نظر یافت نشد");
        return result
    }
}

module.exports = {
    AdminRoleController : new AdminRoleController(),
}
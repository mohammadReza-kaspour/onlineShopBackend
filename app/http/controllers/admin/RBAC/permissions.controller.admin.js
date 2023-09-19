const {StatusCodes} = require("http-status-codes");
const { permissionModel } = require("../../../../models/permissions.model");
const { createError, copyObject, badFieldsOrBadValuesFilter } = require("../../../../utils/functions.utils");
const { default: mongoose } = require("mongoose");

class AdminpermissionController {
    getAllPermissions = async (req , res , next) => {
        try {
            const permissions = await permissionModel.find({})

            res.status(StatusCodes.OK).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "لیست دسترسی ها دریافت شد",
                    data : {
                        permissions,
                    }
                }
            })
        } catch (error) {
            next(error)
        }
    }
    addPermission = async (req , res , next) => {
        try {
            const {title , description} = req.body;
            await this.#findPermissionByTitle(title);
            const result = await permissionModel.create({title , description});
            if(!result) throw createError(StatusCodes.INTERNAL_SERVER_ERROR,"سطح دسترسی ایجاد نشد");

            res.status(StatusCodes.OK).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "سطح دسترسی با موفقیت ایجاد شد",
                }
            })
        } catch (error) {
            next(error)
        }
    }
    removePermission = async (req , res , next) => {
        try {
            const {field} = req.params;

            const permission = await this.#findPermissionByTitleOrID(field);
            const result = await permissionModel.deleteOne({_id:permission._id});
            if(result.deletedCount <= 0) throw createError(StatusCodes.INTERNAL_SERVER_ERROR,"سطح دسترسی حذف نشد");
            

            res.status(StatusCodes.OK).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "سطح دسترسی با موفقیت حذف شد",
                }
            })
        } catch (error) {
            next(error)
        }
    }
    editPermission = async (req , res , next) => {
        try {
            const permissionID = new mongoose.Types.ObjectId(req.params.permissionid);
            let data = copyObject(req.body);
            data = badFieldsOrBadValuesFilter(data , ["title","description"]);

            const permission = await this.#findPermissionByTitleOrID(permissionID);
            const result = await permissionModel.updateOne(
                {_id : permission._id},
                {$set : data}
            );
            if(result.modifiedCount <= 0) throw createError(StatusCodes.INTERNAL_SERVER_ERROR,"سطح دسترسی به روز رسانی نشد");

            res.status(StatusCodes.OK).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "سطح دسترسی با موفقیت به روز رسانی شد",
                }
            })
        } catch (error) {
            next(error)
        }
    }
    #findPermissionByTitleOrID = async (field) => {
        let searchPattern = mongoose.isValidObjectId(field) ? {_id:field} : {title:field.trim()};
        const result = await permissionModel.findOne(searchPattern);
        if(!result) throw createError(StatusCodes.BAD_REQUEST , "متاسفانه سطح دسترسی مورد نظر یافت نشد");
        return result
    }
    #findPermissionByTitle = async (title) => {
        const permission = await permissionModel.findOne({title});
        if(permission) throw createError(StatusCodes.BAD_REQUEST , "سطح دسترسی با این عنوان قبلا ذخیره شده است");
    }
}

module.exports = {
    AdminpermissionController : new AdminpermissionController(),
}
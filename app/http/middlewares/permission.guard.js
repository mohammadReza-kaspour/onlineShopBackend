const { permissionModel } = require("../../models/permissions.model");
const { roleModel } = require("../../models/roles.model");
const { createError } = require("../../utils/functions.utils");

const checkPermission = (requiredPermissionByRole = []) => {
    return async (req , res , next) => {
        try {
            const user = req.user;
            const errorMessage = createError(403 , "دسترسی به این قسمت برای شما مجاز نمیباشد");

            const role = await roleModel.findOne({title:user.role});
            if(!role) throw createError(400 , "این نقش در سیستم ایجاد نشده است");
            const permissions = await permissionModel.find({_id : {$in : role.permissions}})
            if(permissions.length <= 0) throw createError(400 , "این نقش در سیستم هیچ دسترسی ای ندارد");
            const userPermissions = permissions.map(item => item.title);

            
            let Access = false;
            let loopResult = false;
            ///////////////////Exceptions///////////////////////////////////
            if(userPermissions.includes("superuser")) Access = true;
            ////////////////////////////////////////////////////////////////
            for(const rolePermissions of requiredPermissionByRole){
                if(Access) continue
                loopResult = rolePermissions.every(permission => {
                    return userPermissions.includes(permission)
                })
                if(loopResult) Access = true
            }

            if(!Access && requiredPermissionByRole.length > 0) throw errorMessage;
            next()
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    checkPermission,
}
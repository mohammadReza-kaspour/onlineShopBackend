const { validationResult } = require("express-validator");
const { createError } = require("../../utils/functions.utils");
const { verifyAccessToken } = require("../../utils/token.utils");
const { userModel } = require("../../models/users.model");

const expressValidatorMapper = (req , res , next) => {
    try {
        const result = validationResult(req);
        let messages = {};
        
        if(result && Object.keys(result.errors).length > 0){
            result.errors.forEach(item => {
                messages[item.path] = item.msg;
            })
            throw createError(400 , messages)
        }

        next();
    } catch (error) {
        next(error);
    }
}

const checkAccessTokenToLoggin = async (req , res , next) => {
    try {
        const authField = req?.headers?.authorization;
        if(!authField) throw createError(401 , "لطفا وارد حساب کاربری خود شوید");

        const [bearer , token] = authField?.split(" ");
        if(!token || bearer.toLowerCase() !== "bearer") throw createError(401 , "لطفا وارد حساب کاربری خود شوید");
        const verifyResult = verifyAccessToken(token);
        if(!verifyResult) throw createError(401 , "لطفا مجدد وارد حساب کاربری خود شوید");

        const {mobile} = verifyResult || {};
        const user = await userModel.findOne({mobile});
        if(!user) throw createError(401 , "خطا در ورود به حساب کاربری لطفا مجدد وارد شوید");

        req.user = user;
        next()

    } catch (error) {
        next(error)
    }
}

module.exports = {
    expressValidatorMapper,
    checkAccessTokenToLoggin,
}
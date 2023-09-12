const { validationResult, header } = require("express-validator");
const { createError } = require("../../utils/functions.utils");
const { verifyAccessToken, verifyRefreshToken, signAccessToken ,signRefreshToken} = require("../../utils/token.utils");
const { userModel } = require("../../models/users.model");
const { redisClient } = require("../../utils/initRedis.utils");

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

const checkRefreshTokenToLogin = async (req , res , next) => {
    try {
        const refreshTokenFromBody = req.body.token;
        if(!refreshTokenFromBody) throw createError(401 , "مجددا وارد حساب کاربری خود شوید");

        const verifyResult = verifyRefreshToken(refreshTokenFromBody);
        if(!verifyResult) throw createError(401 , "توکن شما معتبر نمیباشد");

        const user = await userModel.findOne({mobile : verifyResult.mobile});
        if(!user) throw createError(401 , "کاربری با این مشخصات یافت نشد توکن نامعتبر می باشد");

        const tokenOnRedis = await redisClient.get(verifyResult.mobile);
        if(tokenOnRedis !== refreshTokenFromBody) throw createError(401 , "توکن صحیح نمیباشد")

        const accessToken = signAccessToken({mobile : user.mobile}) || createError(401 , "خطا در ایجاد توکن");
        const refreshToken = await signRefreshToken({mobile : user.mobile}) || createError(401 , "خطا در ایجاد توکن");

        req.token = {
            accessToken,
            refreshToken,
        }

        next()
    } catch (error) {
        next(error)
    }
}

const swaggerFreeObjectFixer = (req , res , next) => {
    try {
        const keys = Object.keys(req.headers);
        const key = keys.findIndex(item => item.toLowerCase() === "content-length");
        const value = req.headers[keys[key]];
        if(+value === 0) delete req.headers[keys[key]];

        next();
    } catch (error) {
        next(error);
    }
}

const checkRole = (role) => {
    return (req , res , next) => {
        try {
            if(!req.user.roles.includes(role)) throw createError(403 , "دسترسی به این قسمت برای شما مجاز نمیباشد");
            next()
        } catch (error) {
            next(error)
        }
    }
}

const parserMiddlewareByCustomField = (field , seperator) => {
    const parserMiddleware = (req , res , next) => {
        try {
            const inputField = req.body[field];
            if(!!inputField){
                if(!Array.isArray(inputField) && typeof inputField !== "string"){
                    throw createError(400 , "ورودی باید به صورت آرایه یارشته باشد");
                }
                if(Array.isArray(inputField)){
                    req.body[field] = inputField.filter(item => {if(!!item.trim()) return item})
                    .map(item => item.trim());
                }
                else if(typeof inputField === "string"){
                    if(!inputField.match(/^[a-z0-9\, ]*$/gmi)){
                        throw createError(400 , "عبارت وارد شده نمیتواند دارای علائم غیر حروف و عدد باشد");
                    }
                    req.body[field] = inputField.split(seperator).filter(item => {if(!!item.trim()) return item})
                        .map(item => item.trim());
                }

            }else req.body[field] = [];
            
            next()
        } catch (error) {
            next(error)
        }
    };
    return parserMiddleware;
}

module.exports = {
    expressValidatorMapper,
    checkAccessTokenToLoggin,
    checkRefreshTokenToLogin,
    swaggerFreeObjectFixer,
    checkRole,
    parserMiddlewareByCustomField,
}
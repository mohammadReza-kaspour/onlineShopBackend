const { createError } = require("../../../utils/functions.utils");

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
    parserMiddlewareByCustomField,
}
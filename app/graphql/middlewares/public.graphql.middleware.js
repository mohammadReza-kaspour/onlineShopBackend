const checkAccessTokenToLogginGraphql = async (req , res , next) => {
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
        return req.user;

    } catch (error) {
        throw error
    }
}



module.exports = {
    checkAccessTokenToLogginGraphql
}
const { userModel } = require("../../../models/users.model");
const { OTP_EXPIRE } = require("../../../utils/constants.utils");
const { badFieldsOrBadValuesFilter, randomNumberGenerator, createError } = require("../../../utils/functions.utils");
const { signAccessToken } = require("../../../utils/token.utils");

class UserAuthController {
    register = async (req , res , next) => {
        try {
            
            res.status(201).json({
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
    checkOTP = async (req , res , next) => {
        try {
            const {mobile , code} = req.body;
            const user = await userModel.findOne({mobile , "OTP.code" : code});
            if(!user) throw createError(400 , "اطلاعات وارد شده نادرست می باشد");
            if(+user.OTP.expire <= Date.now()) throw createError(400 , "کد شما منقضی شده است");

            const accessToken = signAccessToken({mobile : user.mobile});

            res.status(201).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "با موفقیت وارد شدید",
                    data : {
                        accessToken
                    }
                }
            })
        } catch (error) {
            next(error)
        }
    }
    getOTP = async (req , res , next) => {
        try {
            const {mobile} = req.body;
            const code = randomNumberGenerator(5);
            const result = await this.handleLoginRequest(mobile , code);
            if(!result) throw createError(500 , "ورود شما انجام نشد لطفا دوباره تلاش نمائید")

            res.status(201).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "کد اعتبار سنجی برای شما ارسال شد",
                    data : {
                        otp : code,
                        mobile
                    }
                }
            })
        } catch (error) {
            next(error)
        }
    }
    handleLoginRequest = async (mobile , code) => {
        const otp = {
            code,
            expire : OTP_EXPIRE  //2min
        }
        
        const result = await this.checkExistUser(mobile);
        if(result) return await this.updateUser(mobile , otp)
        else return !!(await userModel.create({mobile , OTP:otp}))
    }
    checkExistUser = async (mobile) => {
        const result = await userModel.findOne({mobile});
        return !! result;
    }
    updateUser = async (mobile , otp) => {
        otp = badFieldsOrBadValuesFilter(otp , ["code" , "expire"]);
        const updateResult = await userModel.updateOne(
            {mobile},
            {$set : {OTP:otp}}
        )

        return !!updateResult.modifiedCount;

    }
}

module.exports = {
    UserAuthController : new UserAuthController(),
}
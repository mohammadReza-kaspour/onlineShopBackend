const { body } = require("express-validator");

const userGetOTPValidation = () => [
    body("mobile").custom((value , {req}) => {
        const mobileRegex = /^(\+98||0||98)9[0-9]{9}$/gmi;
        if(!mobileRegex.test(value)) throw "شماره موبایل وارد شده صحیح نمیباشد";

        return true;
    }),
]

const userCheckOTPValidation = () => [
    body("mobile").custom((value , {req}) => {
        const mobileRegex = /^(\+98||0||98)9[0-9]{9}$/gmi;
        if(!mobileRegex.test(value)) throw "شماره موبایل وارد شده صحیح نمیباشد";

        return true;
    }),
    body("code").trim().notEmpty().withMessage("کد وارد شده معتبر نمیباشد")
]

module.exports = {
    userGetOTPValidation,
    userCheckOTPValidation,
}
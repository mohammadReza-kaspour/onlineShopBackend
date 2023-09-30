const { StatusCodes } = require("http-status-codes");
const { getUserBasket, checkIfEmptyBasket, checkReadyToPay, invoiceNumberGenerator, DBUpdaterAfterVerifyPayment } = require("../../../utils/payments.utils");
const { PAYMENT_CONSTANTS } = require("../../../utils/constants.utils");
const { createError } = require("../../../utils/functions.utils");
const { default: axios } = require("axios");
const { paymentModel } = require("../../../models/payments.model");
const { userModel } = require("../../../models/users.model");
const { productModel } = require("../../../models/products.model");
const { courseModel } = require("../../../models/courses.model");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

class ApiPaymentController {
    paymentGateway = async (req , res , next) => {
        try {
            const {user} = req;

            checkIfEmptyBasket(user);
            const basket = await getUserBasket(user).then(res => res?.[0]);
            checkReadyToPay(basket);
            
            
            const zarinpalRequestURL = "https://api.zarinpal.com/pg/v4/payment/request.json";
            const zarinpalGateWayURL = "https://www.zarinpal.com/pg/StartPay/"
            const zarinpalOptions = {
                merchant_id : PAYMENT_CONSTANTS.merchant_id,
                amount : basket?.payDetail?.paymentAmount,
                description : "جهت خرید دوره ها یا محصولات سایت",
                metadata : {
                    mobile : user?.mobile, 
                    email : user?.email || "example@domain.com"
                },
                callback_url : "http://localhost:3000/payment/verify",

            }
            const requestResult = await axios.post(zarinpalRequestURL , zarinpalOptions)
                .then(response => response.data);
            if(![100 , 101].includes(requestResult.data.code) || !requestResult.data.authority){
                throw createError(StatusCodes.BAD_REQUEST , "پارامتر های ارسال شده صحیح نمیباشد")
            }

            const {code , authority} = requestResult.data;
            const result = await paymentModel.create({
                invoiceNumber : invoiceNumberGenerator(),
                authority,
                amount : basket?.payDetail?.paymentAmount,
                description : "خرید دوره یا محصولات فروشگاه",
                verify : false,
                user : user._id,
                basket,
            })
            if(!result) throw createError(StatusCodes.INTERNAL_SERVER_ERROR , "فاکتور فروش ایجاد نشد");

            res.status(StatusCodes.OK).json({
                code : code,
                GateWay : zarinpalGateWayURL + authority,
            });

        } catch (error) {
            next(error);
        }
    }
    verifyPayment = async (req , res , next) => {
        try {
            const {Authority : authority , Status : status} = req.query;
            const verifyURL = "https://api.zarinpal.com/pg/v4/payment/verify.json";

            const payment = await paymentModel.findOne({authority});
            if(!payment) throw createError(StatusCodes.BAD_REQUEST , "تراکنش در انتظار پرداخت یافت نشد");
            if(payment.verify) throw createError(StatusCodes.BAD_REQUEST , "این تراکنش قبلا انجام شده است");

            const verifyBody = JSON.stringify({
                authority,
                amount : payment.amount,
                merchant_id : PAYMENT_CONSTANTS.merchant_id
            });
            const verifyResult = await fetch(verifyURL , {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : verifyBody
            }).then(res => res.json());
            if(verifyResult?.errors?.code) throw createError(StatusCodes.BAD_REQUEST , "تراکنش ناموفق");

            const result = await paymentModel.updateOne(
                {authority},
                {
                    $set : {
                        verify : true,
                        ref_id : verifyResult?.ref_id,
                    }
                }
            );
            if(result.modifiedCount <= 0) throw createError(StatusCodes.INTERNAL_SERVER_ERROR,"تراکنش ناموفق");

            await DBUpdaterAfterVerifyPayment(userModel , productModel , courseModel , paymentModel , authority);

            res.status(StatusCodes.OK).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "تراکنش با موفقیت انجام شد",
                }
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    ApiPaymentController : new ApiPaymentController(),
}
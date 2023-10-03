const { StatusCodes } = require("http-status-codes");
const { createError } = require("../../../utils/functions.utils");
const { default: mongoose } = require("mongoose");
const { conversationModel } = require("../../../models/chatEngine.model");

class SupportNameSpaceController {
    addNameSpace = async (req , res , next) => {
        try {
            const {title , endpoint} = req.body;
            const conversation = await conversationModel.create({title , endpoint});
            if(!conversation) throw createError(StatusCodes.INTERNAL_SERVER_ERROR,"پوشه ایجاد نشد");
    
            res.status(StatusCodes.CREATED).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "پوشه با موفقیت ایجاد شد",
                    data : {
                        conversation
                    }
                }
            })
        } catch (error) {
            next(error)
        }
    }
    getAllNameSpace = async (req , res , next) => {
        try {
            const conversation = await conversationModel.find({},{rooms : 0});
            if(conversation.length <= 0) throw createError(StatusCodes.INTERNAL_SERVER_ERROR,"پوشه ای یافت نشد");
    
            res.status(StatusCodes.OK).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "لیست پوشه ها دریافت شد",
                    data : {
                        conversation
                    }
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    SupportNameSpaceController : new SupportNameSpaceController(),
}
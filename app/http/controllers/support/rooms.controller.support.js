const { StatusCodes } = require("http-status-codes");
const { createError, copyObject, badFieldsOrBadValuesFilter } = require("../../../utils/functions.utils");
const { default: mongoose } = require("mongoose");
const { conversationModel } = require("../../../models/chatEngine.model");

class SupportRoomController {
    addRoom = async (req , res , next) => {
        try {
            let data = copyObject(req.body);
            if(req.file) data.image = req.file.path;
            data = badFieldsOrBadValuesFilter(data , ["endpoint","name","description","image"]);

            await this.#findRoomByEndPoint(data?.endpoint);
            let room = {
                name : data?.name,
                description : data?.description,
                image : data?.image,
            }
            room = badFieldsOrBadValuesFilter(room , ["name","description","image"]);

            const result = await conversationModel.updateOne(
                {endpoint : data?.endpoint},
                {
                    $push : {rooms : room}
                }
            );
            if(result.modifiedCount <= 0) throw createError(StatusCodes.INTERNAL_SERVER_ERROR,"اتاق ایجاد نشد");
    
            res.status(StatusCodes.CREATED).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "اتاق با موفقیت ایجاد شد",
                }
            })
        } catch (error) {
            next(error)
        }
    }
    getAllRooms = async (req , res , next) => {
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
    #findRoomByEndPoint = async (endpoint) => {
        const result = await conversationModel.findOne({endpoint});
        if(!result) throw createError(StatusCodes.NOT_FOUND,"پوشه مورد نظر یافت نشد");
        return result;
    }
}

module.exports = {
    SupportRoomController : new SupportRoomController(),
}
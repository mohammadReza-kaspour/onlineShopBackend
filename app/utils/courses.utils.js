const { getTime } = require("./episodes.utils");
const { createError } = require("./functions.utils");
const {StatusCodes} = require("http-status-codes");

const addImageToDataIfExists = (data , req , required = false) => {
    if(req?.files && req?.files?.length > 0) data.images = req.files.map(item => item.path);
    if(required && data.images.length <= 0) throw createError(StatusCodes.BAD_REQUEST , "تصویر ارسالی نمیتواند خالی باشد")
    return data
}

const getSumOfTimes = (course) => {
    const {chapters} = course;
    let totalSecond = 0;

    for(const chapter of chapters){
        const {episodes} = chapter;

        for(const episode of episodes){
            const timeArray = episode.time.split(":");
            const timeInSecond = (+timeArray[0]*3600) + (+timeArray[1]*60) + +timeArray[2]
            totalSecond += timeInSecond
        }
    }
    return getTime(totalSecond)
}

module.exports = {
    addImageToDataIfExists,
    getSumOfTimes,
}
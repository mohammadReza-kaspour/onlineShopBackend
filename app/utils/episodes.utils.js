const getTime = (totalDurationInSecond) => {
    const hour = ""+Math.floor(totalDurationInSecond/3600);
    const minute = ""+(Math.floor(totalDurationInSecond/60)-(hour*60));
    const second = ""+Math.floor(totalDurationInSecond - (minute*60) - (hour*3600));
    return `${hour.padStart(2 , "0")}:${minute.padStart(2 , "0")}:${second.padStart(2 , "0")}`
}

module.exports = {
    getTime
}
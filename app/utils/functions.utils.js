const randomNumberGenerator = (length = 5) => {
    const {max , min} = {max:10 , min:0};
    let finalString = "";
    let oneDigitRand = 0

    for(i=0;i<length;i++){
        oneDigitRand = Math.floor(Math.random()*(max-min) + min)
        finalString += oneDigitRand;
    }

    return finalString;
}

const createError = (statusCode , message) => {
    return {statusCode , message};
}

const badFieldsOrBadValuesFilter = (data , acceptedFilds = []) => {
    const validFilds = acceptedFilds;
    const badValues = [" " , "" , undefined , null , 0 , -1 , NaN];

    Object.entries(data).forEach(([key , value]) => {
        if(typeof value === "string"){
            data[key] = value.trim();
            value = value.trim();
        }
        if(!validFilds.includes(key)) delete data[key];
        if(badValues.includes(value)) delete data[key];
        if(Array.isArray(data[key])){
            data[key] = data[key].filter(element => {
                if(!badValues.includes(element)) return element;
            })
        }
    })

    return data;
}

module.exports = {
    randomNumberGenerator,
    createError,
    badFieldsOrBadValuesFilter
}
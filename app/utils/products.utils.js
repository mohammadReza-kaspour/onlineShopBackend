const { badFieldsOrBadValuesFilter } = require("./functions.utils");

const createFeature = (data , featureFields) => {
    let featureValue = [];
    let feature = {};
    featureFields.forEach(item => featureValue.push(!!data[item]?data[item]:""));
    featureFields.forEach((item , index) => feature[featureFields[index]] = featureValue[index]); 
    data.feature = badFieldsOrBadValuesFilter(feature , featureFields);
    
    return data
}

const addImageToDataIfExists = (data , req) => {
    if(req.files.length > 0) data.images = req.files.map(item => item.path);
    return data
}

module.exports = {
    createFeature,
    addImageToDataIfExists,
}
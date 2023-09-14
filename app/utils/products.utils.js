const { badFieldsOrBadValuesFilter } = require("./functions.utils");

const createTypeAndFeature = (data , featureFields) => {
    let featureValue = [];
    let feature = {};
    let type = "digital";
    featureFields.forEach(item => featureValue.push(!!data[item]?data[item]:""));
    featureFields.forEach((item , index) => feature[featureFields[index]] = featureValue[index]); 
    data.feature = badFieldsOrBadValuesFilter(feature , featureFields);
    
    if(Object.keys(data.feature).length > 0) type = "physical"
    data.type = type
    return data
}

const addImageToDataIfExists = (data , req) => {
    if(req.files.length > 0) data.images = req.files.map(item => item.path);
    return data
}

module.exports = {
    createTypeAndFeature,
    addImageToDataIfExists,
}
const { Schema, Types, model } = require("mongoose");

const sliderSchema = new Schema({
    title : {type : String},
    text : {type : String},
    image : {type : String , required : true},
    type : {type : String , default : "main"},
},{
    timestamps : true
})

const sliderModel = model("slider" , sliderSchema);

module.exports = {
    sliderModel,
}
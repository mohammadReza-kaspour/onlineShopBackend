const { Schema, Types, model } = require("mongoose");

const categorySchema = new Schema({
    title : {type : String , required : true},
    parent : {type : Types.ObjectId , default : undefined},
},{
    timestamps : true
})

const categoryModel = model("category" , categorySchema , "categories");

module.exports = {
    categoryModel,
}
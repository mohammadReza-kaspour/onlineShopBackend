const { Schema, Types, model } = require("mongoose");

const categorySchema = new Schema({
    title : {type : String , required : true},
},{
    timestamps : true
})

const categoryModel = model("category" , categorySchema , "categories");

module.exports = {
    categoryModel,
}
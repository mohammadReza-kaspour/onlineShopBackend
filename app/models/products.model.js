const { Schema, Types, model } = require("mongoose");

const featureSchema = new Schema({
    length : {type : String , default : ""},
    height : {type : String , default : ""},
    width : {type : String , default : ""},
    weight : {type : String , default : ""},
    colors : {type : [String] , default : []},
    model : {type : [String] , default : []},
    madeIn : {type : String , default : ""},
    length : {type : String , default : ""},
})

const productSchema = new Schema({
    title : {type : String , required : true},
    short_desc : {type : String , required : true},
    total_desc : {type : String , required : true},
    images : {type : [String] , required : true},
    tags : {type : [String] , default : []},
    category : {type : Types.ObjectId , required : true},
    comments : {type : [] , default : []},
    likes : {type : [Types.ObjectId] , default : []},
    dislikes : {type : [Types.ObjectId] , default : []},
    bookmarks : {type : [Types.ObjectId] , default : []},
    price : {type : Number , default : 0},
    discount : {type : Number , default : 0},
    count : {type : Number , default : 0},
    type : {type : String , required : true},
    time : {type : String},
    format : {type : String},
    teacher : {type : Types.ObjectId , required : true},
    feature : {type : featureSchema},
},{
    timestamps : true
})

const productModel = model("product" , productSchema);

module.exports = {
    productModel,
}
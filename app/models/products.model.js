const { Schema, Types, model } = require("mongoose");
const { commentSchema } = require("./publicSchema.model");

const featureSchema = new Schema({
    length : {type : String , default : ""},
    height : {type : String , default : ""},
    width : {type : String , default : ""},
    weight : {type : String , default : ""},
    colors : {type : [String] , default : []},
    model : {type : [String] , default : []},
    madeIn : {type : String , default : ""},
})

const productSchema = new Schema({
    title : {type : String , required : true},
    short_desc : {type : String , required : true},
    total_desc : {type : String , required : true},
    images : {type : [String] , default: []},
    tags : {type : [String] , default : []},
    category : {type : [Types.ObjectId] , default: []},
    comments : {type : [commentSchema] , default : []},
    likes : {type : [Types.ObjectId] , default : []},
    dislikes : {type : [Types.ObjectId] , default : []},
    bookmarks : {type : [Types.ObjectId] , default : []},
    price : {type : Number , default : 0},
    discount : {type : Number , default : 0},
    count : {type : Number , default : 0},
    type : {type : String , required : true},//virtual , physical
    format : {type : String},
    supplier : {type : Types.ObjectId , required : true},
    feature : {type : featureSchema},
},{
    timestamps : true
})

productSchema.index({title : "text", short_desc : "text" , total_desc : "text"})

const productModel = model("product" , productSchema);

module.exports = {
    productModel,
}
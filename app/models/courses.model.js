const { Schema, Types, model, default: mongoose } = require("mongoose");
const { commentSchema } = require("./publicSchema.model");

const episode = new Schema({
    title : {type : String , required : true},
    text: {type : String , required : true},
    type : {type : String , default : free},
    time: {type : String , required : true},
})

const chapter = new Schema({
    title : {type : String , required : true},
    text: {type : String , required : true},
    episodes : {type : [episode] , default:[]},
})

const courseSchema = new Schema({
    title : {type : String , required : true},
    short_desc : {type : String , required : true},
    total_desc : {type : String , required : true},
    images : {type : [String] , required : true},
    tags : {type : [String] , default : []},
    category : {type : Types.ObjectId , required : true},
    comments : {type : [commentSchema] , default : []},
    likes : {type : [Types.ObjectId] , default : []},
    dislikes : {type : [Types.ObjectId] , default : []},
    bookmarks : {type : [Types.ObjectId] , default : []},
    price : {type : Number , default : 0},
    discount : {type : Number , default : 0},
    type : {type : String , required : true , default: "free"}, //free-cash-vip
    time : {type : String , default: "00:00:00"},
    supplier : {type : Types.ObjectId , required : true},
    chapters : {type : [chapter] , default : []},
    students : {type : [Types.ObjectId] , default : []},
},{
    timestamps : true
})

const courseModel = model("course" , courseSchema);

module.exports = {
    courseModel,
}
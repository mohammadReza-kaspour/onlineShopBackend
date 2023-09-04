const { Schema, Types, model } = require("mongoose");

const blogSchema = new Schema({
    author : {type : Types.ObjectId , required : true},
    title : {type : String , required : true},
    text : {type : String , required : true},
    image : {type : String , required : true},
    tags : {type : [String] , default : []},
    categoty : {type : Types.ObjectId , required : true},
    comments : {type : [] , default : []},
    likes : {type : [Types.ObjectId] , default : []},
    dislikes : {type : [Types.ObjectId] , default : []},
    bookmarks : {type : [Types.ObjectId] , default : []},
},{
    timestamps : true
})

const blogModel = model("blog" , blogSchema);

module.exports = {
    blogModel,
}
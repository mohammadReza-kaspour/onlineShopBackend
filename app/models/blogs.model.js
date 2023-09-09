const { Schema, Types, model } = require("mongoose");

const commentSchema = new Schema({
    user : {type : Types.ObjectId , ref : "users" , required : "true"},
    comment : {type : String , default : ""},
    createdAt : {type : Date , dafault : Date.now()},
    parent : {type : Types.ObjectId},
})

const blogSchema = new Schema({
    author : {type : Types.ObjectId , required : true},
    title : {type : String , required : true},
    text : {type : String , required : true},
    image : {type : String , required : true},
    tags : {type : [String] , default : []},
    category : {type : [Types.ObjectId] , required : true , default : []},
    comments : {type : [commentSchema] , default : []},
    likes : {type : [Types.ObjectId] , ref:"users" , default : []},
    dislikes : {type : [Types.ObjectId] , ref:"users" , default : []},
    bookmarks : {type : [Types.ObjectId] , ref:"users" , default : []},
},{
    timestamps : true,
    versionKey : false,
})

const blogModel = model("blog" , blogSchema);

module.exports = {
    blogModel,
}
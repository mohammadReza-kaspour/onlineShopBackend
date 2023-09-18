const { Schema, Types, model } = require("mongoose");
const { commentSchema } = require("./publicSchema.model");
const { BASE_URL, PORT } = require("../utils/constants.utils");

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
} , {toJSON : {virtuals:true}});
blogSchema.virtual("imageURL").get(function (){
    return `${BASE_URL}:${PORT}/${this.image.split("\\").slice(1,).join("/")}`;
});
const blogModel = model("blog" , blogSchema);

module.exports = {
    blogModel,
}
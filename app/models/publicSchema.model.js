const { Schema, Types } = require("mongoose");

const commentSchema = new Schema({
    user : {type : Types.ObjectId , ref : "users" , required : "true"},
    comment : {type : String , default : ""},
    createdAt : {type : Date , dafault : Date.now()},
    parent : {type : Types.ObjectId},
})

module.exports = {
    commentSchema,
}

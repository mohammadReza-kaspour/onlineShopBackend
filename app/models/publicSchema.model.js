const { Schema, Types } = require("mongoose");

const commentSchema = new Schema({
    user : {type : Types.ObjectId , required : "true"},
    comment : {type : String , default : ""},
    show : {type : Boolean , default : false},
    parent : {type : Types.ObjectId , default : undefined},
},{
    timestamps : true,
})

module.exports = {
    commentSchema,
}

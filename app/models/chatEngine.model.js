const { Schema, Types, model } = require("mongoose");

const messageSchema = new Schema({
    user : {type : Types.ObjectId , required : "true"},
    message : {type : String},
},{
    timestamps : true
})

const roomSchema = new Schema({
    name : {type : String , required : "true"},
    description : {type : String},
    image : {type : String},
    messages : {type : [messageSchema] , default : []},
})

const conversationSchema = new Schema({
    title : {type : String , required : "true"},
    endpoint : {type : String , required : "true"},
    rooms : {type : [roomSchema] , default : []},
    
})

const conversationModel = model("conversation" , conversationSchema);

module.exports = {
    conversationModel,
}
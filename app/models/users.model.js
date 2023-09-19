const { Schema, Types, model } = require("mongoose");

const OTPSchema = new Schema({
    code : {type : String , default : ""},
    expire : {type : Number , default : 0},
})

const userSchema = new Schema({
    firstName : {type : String},
    lastName : {type : String},
    username : {type : String , lowercase : true , unique:true},
    email : {type : String , lowercase : true},
    mobile : {type : String , required : true , unique:true},
    password : {type : String},
    OTP : {type : OTPSchema},
    bills : {type : []},
    discount : {type : Number , default : 0},
    birthday : {type : String},
    role : {type : String , default : "USER"},
    courses : {type : [Types.ObjectId] , default : []},
},{
    timestamps : true,
})
userSchema.index({firstName:"text",lastName:"text",username:"text",mobile:"text",email:"text"});

const userModel = model("user" , userSchema);

module.exports = {
    userModel,
}
const { Schema, Types, model } = require("mongoose");

const OTPSchema = new Schema({
    code : {type : String , default : ""},
    expire : {type : Number , default : 0},
})

const userSchema = new Schema({
    firstName : {type : String},
    lastName : {type : String},
    username : {type : String , lowercase : true},
    email : {type : String , lowercase : true},
    phone : {type : String , required : true},
    password : {type : String},
    OTP : {type : OTPSchema},
    bills : {type : []},
    discount : {type : Number , default : 0},
    birthday : {type : String},
    roles : {type : [String] , default : ["USER"]},
},{
    timestamps : true
})

const userModel = model("user" , userSchema);

module.exports = {
    userModel,
}
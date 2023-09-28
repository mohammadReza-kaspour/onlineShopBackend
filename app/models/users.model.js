const { Schema, Types, model, default: mongoose } = require("mongoose");

const OTPSchema = new Schema({
    code : {type : String , default : ""},
    expire : {type : Number , default : 0},
})
const productSchema = new Schema({
    productID : {type : Types.ObjectId , rel : "pruduct"},
    count : {type : Number , default : 1},
});
const courseSchema = new Schema({
    courseID : {type : Types.ObjectId , rel : "course"},
    count : {type : Number , default : 1},
});
const basketSchema = new Schema({
    products : {type : [productSchema] , default : []},
    courses : {type : [courseSchema] , default : []},
});
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
    basket : {type : basketSchema},
},{
    timestamps : true,
})
userSchema.index({firstName:"text",lastName:"text",username:"text",mobile:"text",email:"text"});

const userModel = model("user" , userSchema);

module.exports = {
    userModel,
}
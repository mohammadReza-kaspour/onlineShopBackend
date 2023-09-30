const { Schema, Types, model } = require("mongoose");

const paymentSchema = new Schema({
    invoiceNumber : {type : String},
    authority : {type : String},
    amount : {type : Number},
    description : {type : String , default : "خرید دوره یا محصولات فروشگاه"},
    verify : {type : Boolean , default : false},
    user : {type : Types.ObjectId , ref : "user"},
    basket : {type : Object , default : {}},
    ref_id : {type : String , default : undefined},
},{
    timestamps : true
})

const paymentModel = model("payment" , paymentSchema);

module.exports = {
    paymentModel,
}
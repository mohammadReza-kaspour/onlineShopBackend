const { Schema, Types, model } = require("mongoose");

const paymentSchema = new Schema({

},{
    timestamps : true
})

const paymentModel = model("payment" , paymentSchema);

module.exports = {
    paymentModel,
}
const { Schema, Types, model } = require("mongoose");

const roleSchema = new Schema({
    title : {type : String , unique:true , required:true},
    description : {type : String , default:""},
    permissions : {type : [Types.ObjectId] , default:[]}
});

const roleModel = model("role" , roleSchema);

module.exports = {
    roleModel,
}
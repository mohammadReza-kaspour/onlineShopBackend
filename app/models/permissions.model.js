const { Schema, Types, model } = require("mongoose");

const permissionSchema = new Schema({
    title : {type : String , unique:true},
    description : {type : String , default:""}
},{
    versionKey:false,
});

const permissionModel = model("permission" , permissionSchema);

module.exports = {
    permissionModel,
}
const { Schema, Types, model, default: mongoose } = require("mongoose");
const { commentSchema } = require("./publicSchema.model");
const { BASE_URL, PORT } = require("../utils/constants.utils");
const { getSumOfTimes } = require("../utils/courses.utils");

const episode = new Schema({
    title : {type : String , required : true},
    text: {type : String , required : true},
    type : {type : String , default : "free"},
    time: {type : String , required : true},
    videoAddress : {type : String , required : true},
} , {toJSON : {virtuals:true}});
episode.virtual("videoURL").get(function (){
    return `${BASE_URL}:${PORT}/${this.videoAddress.split("\\").slice(1,).join("/")}`;
});

const chapter = new Schema({
    title : {type : String , required : true},
    text: {type : String , required : true},
    episodes : {type : [episode] , default:[]},
})

const courseSchema = new Schema({
    title : {type : String , required : true},
    short_desc : {type : String , required : true},
    total_desc : {type : String , required : true},
    images : {type : [String] , default : []},
    tags : {type : [String] , default : []}, 
    category : {type : [Types.ObjectId] , default : []},
    comments : {type : [Types.ObjectId] , default : []},
    likes : {type : [Types.ObjectId] , default : []},
    dislikes : {type : [Types.ObjectId] , default : []},
    bookmarks : {type : [Types.ObjectId] , default : []},
    price : {type : Number , default : 0},
    discount : {type : Number , default : 0},
    status : {type : String , default: "notstarted"},//notstarted , finished , ongoing
    type : {type : String , required : true , default: "free"}, //free-cash-vip
    supplier : {type : Types.ObjectId , required : true},
    chapters : {type : [chapter] , default : []},
    students : {type : [Types.ObjectId] , default : []},
},{
    timestamps : true,
    toJSON : {virtuals:true}
});
courseSchema.virtual("imagesURL").get(function (){
    let URLList = []
    if(this.images.length > 0){
        this.images.forEach(item => {
            URLList.push(`${BASE_URL}:${PORT}/${item.split("\\").slice(1,).join("/")}`);
        })
    }
    return URLList;
});
courseSchema.virtual("totalTime").get(function(){
    return getSumOfTimes(this);
})
courseSchema.index({title:"text" , short_desc:"text" , total_desc:"text"});

const courseModel = model("course" , courseSchema);

module.exports = {
    courseModel,
}
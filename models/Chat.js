const mongoose =require("mongoose");
// const passportLocalMongoose=require("passport-local-mongoose");

const chatSchema=new mongoose.Schema({
    person1:String,
    person2:String,
    messages:[String]
})

const Chat=new mongoose.model("Chat",chatSchema);

module.exports=Chat
const mongoose=require("mongoose");

//1- create schema (rules) //plugins 
let speakerSchema=new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    email:{type:String,unique:true},
    password:String,         //bcrypt
    username:String,
    address:{city:String,street:String,building:Number}
    
});

module.exports=mongoose.model("speakers",speakerSchema)


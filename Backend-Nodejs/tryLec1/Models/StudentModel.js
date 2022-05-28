const mongoose=require("mongoose");
const autoIncreament = require("mongoose-sequence")(mongoose);

//1- create schema (rules) //plugins 
let studentSchema=new mongoose.Schema({
    _id:Number,
    email:String,
    password:String,   //bcrypt
   // event:[{type:Number,ref:"events"}]
});
studentSchema.plugin(autoIncreament);

//2- register  //collection , schma
module.exports=mongoose.model("students",studentSchema)
// mongoose.plugin(autocomplete)
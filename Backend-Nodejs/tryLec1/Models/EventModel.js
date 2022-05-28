const mongoose=require("mongoose");
const autoIncreament = require("mongoose-sequence")(mongoose);

//1- create schema (rules) //plugins 
let eventSchema=new mongoose.Schema(
    {
    _id:Number,
    title:{type:String,require:[true,'please enter title']},
    date:Date,
    mainSpeaker:{type:mongoose.Types.ObjectId,ref:"speakers"},
    otherSpeakers:[{type:mongoose.Types.ObjectId,ref:"speakers"}],
    students:[{type:Number,ref:"students"}]
    });
    eventSchema.plugin(autoIncreament, {id: 'id', inc_field: "_id" });

//2- register  //collection , schma
module.exports=mongoose.model("events",eventSchema);
// mongoose.plugin(autocomplete)


import mongoose from "mongoose";
let messageschema= mongoose.Schema({
    name:{type:String,required:true} ,
    email:{type:String,required:true} ,
    phone:{type:Number,required:true} ,
    message:{type:String,required:true} 
})
export let messageshm= new mongoose.model("messages model", messageschema)
import mongoose from "mongoose";
let addfundschema= mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
Amount:{type:Numberm, required:true}
},{timestamps:true})
export let addfund= new mongoose.model("Add Funs",addfundschema)
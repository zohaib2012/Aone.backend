import mongoose from "mongoose";

let forgetpasswordshm = mongoose.Schema({
    email: { type: String, required: true },
    verificationCode: { type: String },
    isVerifies: { type: Boolean,default:false },
    verificationExpires:{type:Date}


})

export const forgetpassword= new mongoose.model("forgetPassword",forgetpasswordshm)
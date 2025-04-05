
import mongoose from "mongoose"
const emailSchema = mongoose.Schema({
    email :{type:String, required:true},
    verificationCode: { type: String },
    isVerified: { type: Boolean, default: false },
    verificationExpires: { type: Date },
});

export const Email = new mongoose.model("email", emailSchema)
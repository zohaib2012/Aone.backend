import mongoose from "mongoose";
let personaldetailschema = mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    address: { type: String, required: true },
    dob: { type: Date, required: true }
})
export let personaldetailshm = new mongoose.model("personal detail model", personaldetailschema)
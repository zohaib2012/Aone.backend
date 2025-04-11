import mongoose from "mongoose";

let userschema = mongoose.Schema({
    country: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

export let usershm = new mongoose.model("user", userschema);

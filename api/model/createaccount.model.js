import mongoose from "mongoose"
const createaccountSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",  // Ensure this matches your actual User model
        required: true
    },
    leverage: { type: String, required: true },
    currency: { type: String, required: true },
    password: { type: String, required: true },
    accountType: { type: String, required: true }

}, { timestamps: true })

export let createaccountshm = new mongoose.model("New account", createaccountSchema)// model/depositmoney.model.js


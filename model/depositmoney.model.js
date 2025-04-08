// model/depositmoney.model.js

import mongoose from "mongoose";

const depositMoneySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",  // Ensure this matches your actual User model
    required: true
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
    min: [0, "Amount cannot be negative"]
  },
  date: {
    type: Date,
    required: [true, "Date is required"]
  },
  images: [String]
}, { timestamps: true });

export const Depositedmoneyshm = mongoose.model("DepositedMoney", depositMoneySchema);

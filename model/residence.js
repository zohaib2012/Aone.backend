// model/depositmoney.model.js

import mongoose from "mongoose";

const residenceSchema = new mongoose.Schema({
 user:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"user",
  required:true
 },
 
residencedocument:[String]
}, { timestamps: true });

export const residensedocs = mongoose.model(" residensedocs", residenceSchema);

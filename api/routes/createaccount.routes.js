import express from "express";
import { createaccount, getaccountsdetails, getallaccounts } from "../controller/createaccount.controller.js";
import { protectedroutes } from "../Middleware/protectedroutes.js";

export let createaccuntroutes = express.Router()
createaccuntroutes.route("/create").post(protectedroutes, createaccount)
createaccuntroutes.route("/details").get(protectedroutes, getaccountsdetails)
createaccuntroutes.route("/all/getdata").get( protectedroutes,getallaccounts)




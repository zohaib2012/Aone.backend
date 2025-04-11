import express from "express"
import { displaypersonaldetail, sendpersonaldetail } from "../controller/personaldetail.js"
import { protectedroutes } from "../Middleware/protectedroutes.js"

export let personaldetailroutes = express.Router()
personaldetailroutes.route("/send").post(sendpersonaldetail)
personaldetailroutes.route("/all/getdata").get( protectedroutes ,displaypersonaldetail)


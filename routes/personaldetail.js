import express from "express"
import { displaypersonaldetail, sendpersonaldetail } from "../controller/personaldetail.js"

export let personaldetailroutes = express.Router()
personaldetailroutes.route("/send").post(sendpersonaldetail)
personaldetailroutes.route("/display").get(displaypersonaldetail)


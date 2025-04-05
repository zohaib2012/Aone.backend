import express from "express";
import { deletemessage, displaymessage, sendmessage } from "../controller/messsage.scontroller.js";

export let messagesroutes = express.Router()
messagesroutes.route("/send").post(sendmessage)
messagesroutes.route("/display").get(displaymessage)
messagesroutes.route("/delete:id").delete(deletemessage)



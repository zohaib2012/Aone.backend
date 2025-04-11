import express from "express";
import { deletemessage, displaymessage, sendmessage } from "../controller/messsage.scontroller.js";
import { protectedroutes } from "../Middleware/protectedroutes.js";

export let messagesroutes = express.Router()
messagesroutes.route("/send").post(sendmessage)
messagesroutes.route("/display").get(protectedroutes ,displaymessage)
messagesroutes.route("/delete:id").delete(deletemessage)



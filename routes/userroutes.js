import express from "express";
import { displayusers, loginuser, registeruser, logoutuser } from "../controller/usercontroller.js";
import { protectedroutes } from "../Middleware/protectedroutes.js";

export let userroutes = express.Router();


userroutes.route("/register").post(registeruser);


userroutes.route("/login").post(loginuser);


userroutes.route("/logout").post(logoutuser);


userroutes.route("/get").get(protectedroutes, displayusers);

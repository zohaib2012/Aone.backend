

import express from "express"
import { generateverificationcode, verifycode } from "../controller/emailverification.controller.js";
export const emailroutes = express.Router();

emailroutes.route("/send-code").post(generateverificationcode);
emailroutes.route("/verify-code").post(verifycode);

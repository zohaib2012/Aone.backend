import express from "express";
import { protectedroutes } from "../Middleware/protectedroutes.js";
import { processresidencedocs } from "../Middleware/multer.js";
import {  getresidencedocs, uploadresidencedoc } from "../controller/residence.controller.js";

const residencedocsroutes = express.Router();

residencedocsroutes.route("/upload").post(protectedroutes, processresidencedocs,uploadresidencedoc)
residencedocsroutes.route("/getdata").get(protectedroutes,getresidencedocs)
export default residencedocsroutes;

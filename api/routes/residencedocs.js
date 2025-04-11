import express from "express";
import { protectedroutes } from "../Middleware/protectedroutes.js";
import { processresidencedocs } from "../Middleware/multer.js";
import { getallresidencialdocs, getresidencedocs, uploadresidencedoc } from "../controller/residence.controller.js";

const residencedocsroutes = express.Router();

residencedocsroutes.route("/upload").post(protectedroutes, processresidencedocs, uploadresidencedoc)
residencedocsroutes.route("/getdata").get(protectedroutes, getresidencedocs)
residencedocsroutes.route("/all/getdata").get(  getallresidencialdocs)
export default residencedocsroutes;

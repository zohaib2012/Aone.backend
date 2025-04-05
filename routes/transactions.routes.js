import express from "express";
import { processFileUpload } from "../Middleware/multer.js";
import { sendmoney, displaymoneytranstions } from "../controller/depositmoney.controller.js";
import { protectedroutes } from "../Middleware/protectedroutes.js";

const router = express.Router();

router.post("/sendmoney", protectedroutes, processFileUpload, sendmoney);
router.get("/getdata", protectedroutes, displaymoneytranstions);

export default router;

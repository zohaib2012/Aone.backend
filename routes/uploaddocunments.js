

// import express from 'express';
// import { uploadDocument } from '../controller/uploaddocunmentscontroller.js';
// import {uploadMiddleware} from '../Middleware/multer.js'
// let documentroutes=express.Router()
// documentroutes.route("/upload").post(uploadMiddleware, uploadDocument)

// export default documentroutes
import express from 'express';
import { protectedroutes } from '../Middleware/protectedroutes.js';
import { processDocumentUpload } from '../Middleware/multer.js';
import {getdocuments, uploaddocument} from "../controller/docunmentscontroller.js"
let documentroutes=express.Router()
documentroutes.route("/upload").post(protectedroutes,processDocumentUpload, uploaddocument)
documentroutes.route("/getdata").get(protectedroutes ,getdocuments)

export default documentroutes
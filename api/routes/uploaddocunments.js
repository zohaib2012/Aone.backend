

import express from 'express';
import { protectedroutes } from "../Middleware/protectedroutes.js"
import { processDocumentUpload } from '../Middleware/multer.js';
import { getalldocuments, getdocuments, uploaddocument } from "../controller/docunmentscontroller.js"

let documentroutes = express.Router()

documentroutes.route("/upload").post(protectedroutes, processDocumentUpload, uploaddocument)
documentroutes.route("/getdata").get(protectedroutes, getdocuments)
documentroutes.route("/all/getdata").get(protectedroutes, getalldocuments)

export default documentroutes
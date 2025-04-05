
// import fs from "fs"
// import path from "path";
// import multer from "multer";
// import { Document } from "../model/uploaddocunmentsmodel.js";

import cloudinary from "../Middleware/Cloudinary.js";

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     const uploadDir = 'uploads/documents';
//     // Create directory if it doesn't exist
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }
//     cb(null, uploadDir);
//   },
//   filename: function(req, file, cb) {
//     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
//     const ext = path.extname(file.originalname);
//     cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
//   }
// });

// // File filter to only allow images
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only image files are allowed!'), false);
//   }
// };

// const upload = multer({ 
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 5 * 1024 * 1024 // 5MB max file size
//   }
// });

// // Upload document controller
// export let uploadDocument = async (req, res) => {
//   try {
//     console.log("Request Files:", req.files);

//     if (!req.files || !req.files.frontImage || !req.files.backImage) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Both front and back images are required' 
//       });
//     }

//     const { documentType, userId } = req.body;

//     if (!userId) {
//       return res.status(400).json({
//         success: false,
//         message: 'userId is required in the request body'
//       });
//     }

//     if (!['cnic', 'license', 'passport'].includes(documentType)) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Invalid document type' 
//       });
//     }

//     // Check if user already has a document of this type
//     const existingDocument = await Document.findOne({
//       userId: userId,
//       documentType
//     });

//     if (existingDocument) {
//       // If file exists and status is rejected, update it
//       if (existingDocument.status === 'rejected') {
//         existingDocument.frontImage = req.files.frontImage[0].path;
//         existingDocument.backImage = req.files.backImage[0].path;
//         existingDocument.status = 'pending';
//         existingDocument.rejectionReason = null;
//         existingDocument.updatedAt = Date.now();

//         await existingDocument.save();

//         return res.status(200).json({
//           success: true,
//           message: 'Document updated successfully',
//           document: existingDocument
//         });
//       } else {
//         // If status is pending or approved, don't allow update
//         return res.status(400).json({
//           success: false,
//           message: `You already have a ${documentType} document ${existingDocument.status === 'pending' ? 'pending review' : 'approved'}`
//         });
//       }
//     }

//     // Create new document
//     const newDocument = new Document({
//       userId: userId,
//       documentType,
//       frontImage: req.files.frontImage[0].path,
//       backImage: req.files.backImage[0].path
//     });

//     await newDocument.save();

//     res.status(201).json({
//       success: true,
//       message: 'Document uploaded successfully',
//       document: newDocument
//     });
//   } catch (error) {
//     console.error('Error in document upload:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error during document upload',
//       error: error.message
//     });
//   }
// };

// export let uploadMiddleware = upload.fields([
//   { name: 'frontImage', maxCount: 1 },
//   { name: 'backImage', maxCount: 1 }
// ]);

// controller/transactoin.controller.js

// import cloudinary from "../Middleware/Cloudinary.js";
// import { Depositedmoneyshm } from "../model/depositmoney.model.js";

import { Document } from "../model/docunmentsmodel.js"

export const uploaddocument = async (req, res) => {
  try {
    const { documentType } = req.body;
    console.log(documentType)
    if (!documentType) {
      return res.status(400).json({ message: "documentType required" });
    }


    const documentUrls = [];
    if (req.files?.length) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          { folder: "products" }
        );
        documentUrls.push(result.secure_url);
      }
    }

    // Ensure that req.user is available (the logged-in user)
    const newDocument = await Document.create({
      documentType,
      document: documentUrls,
      user: req.user._id  // Access logged-in user from req.user
    });

    return res.status(201).json({
      message: "Transaction saved successfully",
      data: newDocument
    });

  } catch (error) {
    console.error("Send money error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getdocuments = async (req, res) => {
  try {
    const documents = await Document.find({ user: req.user._id }) // ✅ Only current user's transactions
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      message: "Transactions retrieved successfully",
      count: documents.length,
      data: documents
    });

  } catch (error) {
    console.error("Get data error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

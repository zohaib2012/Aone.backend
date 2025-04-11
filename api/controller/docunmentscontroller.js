

// import cloudinary from "../Middleware/Cloudinary.js";
// import {cloudinary} from "../Middleware/cloudinary.js"
import cloudinary from "../Middleware/cloudinary.js"
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


export let getalldocuments=async(req,res)=>{
  try {
    let data=await Document.find()
    if(!data){
      return res.status(400).json({message:"Error while fetchind documents"})
    }
    return res.status(200).json({message:"Documents fetch sucessfully",data:data,count:data.length})
  } catch (error) {
    console.log(error)
  }
}
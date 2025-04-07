import cloudinary from "../Middleware/cloudinary.js";
import { residensedocs } from "../model/residence.js";

export let uploadresidencedoc=async(req,res)=>{
    try {
        console.log("one")
       const docsUrls = [];
          if (req.files?.length) {
            for (const file of req.files) {
              const result = await cloudinary.uploader.upload(
                `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
                { folder: "products" }
              );
              docsUrls.push(result.secure_url);
            }
          } 


          let newresidencedoc=await residensedocs.create({
            residencedocument:docsUrls,
            user:req.user._id
          })
        //   console.log(residencedocument)
          return res.status(200).json({message:"transaction saved sucessfully",
            data:newresidencedoc
        })
    } catch (error) {
        console.log(error)
    }
}

export const getresidencedocs=async(req,res)=>{
    try {
        let transactions= await residensedocs.find({user:req.user._id}).sort({createdAt:-1}).lean()
        if(!transactions){

            return res.status(400).json({message:"transaction fetching error"})
        }
        return res.status(200).json({message:"transaction fetch sucssfully",
            transactions:transactions.count,
            data:transactions
        })
    } catch (error) {
        console.log(error)
    }
}

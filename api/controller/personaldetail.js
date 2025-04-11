
import { personaldetailshm } from "../model/personaldetail.js"

export let sendpersonaldetail=async(req,res)=>{
    try {
     let {name,lastname,dob,address}= req.body
     let newmpersonalshm=await personaldetailshm.create({
        name,lastname,dob,address
     })   

     if(!newmpersonalshm){
        return res.status(400).json({message:"Error while send details"})
    }
    return res.status(200).json({message:"Message send sucessfully",newmpersonalshm})
} catch (error) {
    console.log(error)
}
}
export let displaypersonaldetail=async(req,res)=>{
    try {
        let details= await personaldetailshm.find()
        if(!personaldetailshm){
            
            return res.status(400).json({message:"data not found"})
        }
        return res.status(200).json({message:"Get data sucessfully",data:details, count:details.length})
    } catch (error) {
        console.log(error)
    }
}
import { createaccountshm } from "../model/createaccount.model.js"


export let createaccount = async (req, res) => {
    try {
        let { leverage, currency, password, accountType } = req.body
        console.log(leverage, currency)
        let newcreateaccountshm = await createaccountshm.create({
            leverage, currency, password, accountType,user:req.user._id
        })

        if (!newcreateaccountshm) {
            return res.status(400).json({ message: "Error while creating account" })
        }
        return res.status(200).json({ message: "Account created sucessfully", data:newcreateaccountshm })
    } catch (error) {
        console.log(error)
    }
}
export let getaccountsdetails = async (req, res) => {
    try {
        let accountsdetail = await createaccountshm.find({user:req.user._id}).sort({createdAt:-1}).lean()
        if (!accountsdetail) {

            return res.status(400).json({ message: "Accountsdetail not found" })
        }
        return res.status(200).json({ message: "Get accountsdetail sucessfully",
            count:accountsdetail.length ,
           data: accountsdetail })
    } catch (error) {
        console.log(error)
    }
}

export let deleteaccount = async (req, res) => {
    try {
        let { id } = req.params
        let deletedata = await createaccountshm.findByIdAndDelete(id)
        if (!deletedata) {

            return res.status(400).json({ message: "error while deleting data", deletedata })
        }
        return res.status(400).json({ message: " delete data sucessfully", deletedata })
    } catch (error) {
        console.log(error)
    }
}
import { sendverificationcode } from "../Middleware/sendverificationcode.js";
import { Email } from "../model/emailverification.model.js";



export const generateverificationcode = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) {
            return res.status(400).json({ message: "email not found " })
        }
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        let newemailshm = await Email.create({
            email, verificationCode
        })
        sendverificationcode(newemailshm.email, verificationCode)
        return res.status(200).json({ message: "code send sucssfully ", newemailshm })

    } catch (error) {
        console.log(error)
    }
}


export const verifycode = async (req, res) => {
    try {
        const { code } = req.body
        const detail = await Email.findOne({ verificationCode: code })
        if (!detail) {
            return res.status(400).json({ message: "invalid or expire" })
        }
        detail.isVerifiede = true
        detail.verificationCode = undefined

        return res.status(200).json({ message: "Email verified sucessfully" })
    } catch (error) {
        console.log(error)
    }

}
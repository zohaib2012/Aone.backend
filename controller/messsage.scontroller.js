import { messageshm } from "../model/messages.model.js"

export let sendmessage = async (req, res) => {
    try {
        let { name, email, phone, message } = req.body
        let newmessageshm = await messageshm.create({
            name, email, phone, message
        })

        if (!newmessageshm) {
            return res.status(400).json({ message: "Error while send message" })
        }
        return res.status(200).json({ message: "Message send sucessfully", newmessageshm })
    } catch (error) {
        console.log(error)
    }
}
export let displaymessage = async (req, res) => {
    try {
        let messages = await messageshm.find()
        if (!messages) {

            return res.status(400).json({ message: "Users not found" })
        }
        return res.status(200).json({ message: "Get Users sucessfully", messages })
    } catch (error) {
        console.log(error)
    }
}
export let deletemessage = async (req, res) => {
    try {
        let { id } = req.params

        let deletedmessage = await messageshm.findByIdAndDelete(id)
        if (!deletedmessage) {

            return res.status(400).json({ message: "Error while deleting message" })
        }
        return res.status(200).json({ message: "message delete sucessfully", deletedmessage })
    } catch (error) {
        console.log(error)
    }
}
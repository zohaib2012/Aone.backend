
import { config } from "dotenv"
import mongoose from "mongoose";
config()
export let connectdatabase = () => {
    mongoose.connection.on("connected", () => {
        console.log("database connected sucessfully")
    })
    mongoose.connection.on("error", () => {
        console.log(" error while connecting database")
    })

    mongoose.connect(process.env.database)

}

import nodemailer from "nodemailer"
import { config } from "dotenv";
config()
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,

    },
   
});

 export const sendEmail=async()=>{
    try {
        const info = await transporter.sendMail({
            from: '"Maddison Foo Koch 👻" <zk4326139@gmail.com>', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
          });
          console.log(info)
    } catch (error) {
        console.log(error)
    }
}


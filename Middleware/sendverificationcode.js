

// export const sendverificationcode = async (email, verificationCode) => {
//     try {
//         const resonse = await transporter.sendMail({

import { transporter } from "./sendemail.js";

//             from: '"Aone World NO.1 Trade" <zk4326139@gmail.com>', // sender address
//             to: email,
//             subject: "Aone Trade", // Subject line
//             text: "Hello world?", // plain text body
//             html: verificationCode
//         });
//         console.log("code sent sucessfully")
//         console.log(resonse)
//     } catch (error) {
//         console.log("erroe here", error)
//     }
// }
export const sendverificationcode = async (email, verificationCode) => {
    try {
        const response = await transporter.sendMail({
            from: '"Aone World NO.1 Trade" <zk4326139@gmail.com>',
            to: email,
            subject: "Aone Trade - Verification Code",
            text: `Your verification code is: ${verificationCode}`,
            html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                     <h2>Aone Trade - Email Verification</h2>
                     <p>Your verification code is:</p>
                     <h3 style="background-color: #f0f0f0; padding: 10px; text-align: center; font-size: 24px;">${verificationCode}</h3>
                     <p>This code will expire in 10 minutes.</p>
                   </div>`
        });
        console.log("Code sent successfully:", response.messageId);
        return { success: true, messageId: response.messageId };
    } catch (error) {
        console.log("Error sending email:", error);
        return { success: false, error: error.message };
    }
}
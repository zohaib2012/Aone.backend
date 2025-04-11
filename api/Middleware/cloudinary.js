import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
	cloud_name: "dv0rjcjfe",
	api_key: "992843568554731",
	api_secret: "dVPGiwBPwQOw3H892AqeCLjmLOk",
});

// export default cloudinary;
// export const cloudinary
export default cloudinary
// middleware/protectedroutes.js

import jwt from "jsonwebtoken";
import { usershm } from "../model/usermodel.js";

export const protectedroutes = async (req, res, next) => {
  try {

    const token = req.cookies.logintoken;  // Ensure the token is passed in cookies
    if (!token) return res.status(401).json({ message: "Unauthorized user" });

    const decoded = jwt.verify(token, process.env.secretkey);
    const user = await usershm.findById(decoded._id);  // Find user by decoded _id
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;  // Attach user info to req.user
    next();
  } catch (error) {
    console.log("protected routes error")
    return res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};

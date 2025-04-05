import { usershm } from "../model/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export let registeruser = async (req, res) => {
    try {
        let { country, email, password } = req.body;
        const existingUser = await usershm.findOne({ email });

        if (existingUser) {
            return res.status(200).json({ message: "User already exists" });
        }

        let hashedpassword = await bcrypt.hash(password, 10);

        let newusershm = await usershm.create({
            country,
            email,
            password: hashedpassword
        });

        
        let token = jwt.sign({ _id: newusershm._id }, process.env.secretkey, { expiresIn: "7d" });

       
        res.cookie("logintoken", token, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "User registered successfully",
            user: newusershm,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};

export let loginuser = async (req, res) => {
    try {
        let { email, password } = req.body;
        console.log("Login Attempt:", email);

        let user = await usershm.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found, please register first" });
        }

        let isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        
        if (!process.env.secretkey) {
            console.error("Secret Key not found in .env");
            return res.status(500).json({ message: "Secret Key not found!" });
        }

        const logintoken = jwt.sign({ _id: user._id }, process.env.secretkey, { expiresIn: "7d" });
        console.log("Generated Token:", logintoken);  

      
        res.cookie("logintoken", logintoken, {
            httpOnly: true,
            secure: false,  
            maxAge: 7 * 24 * 60 * 60 * 1000  
        });
        // console.log(user._id)
        return res.status(200).json({ message: "Login successful", user, logintoken });
    } catch (error) {
        console.log("Error in loginuser function:", error);
        return res.status(500).json({ message: "Server error" });
    }
};






export let logoutuser = async (req, res) => {
    try {
        res.clearCookie("logintoken", {
            httpOnly: true,
            secure: true
        });
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};

export let displayusers = async (req, res) => {
    try {
        let users = await usershm.find();
        if (!users) {
            return res.status(400).json({ message: "Error while fetching users" });
        }
        return res.status(200).json({ message: "Fetched users successfully", users });
    } catch (error) {
        console.log(error);
    }
};

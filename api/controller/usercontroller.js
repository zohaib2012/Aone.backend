import { usershm } from "../model/usermodel.js";
import bcrypt from "bcryptjs";
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
        return res.status(200).json({ message: "Fetched users successfully", data: users });
    } catch (error) {
        console.log(error);
    }
};


export const forgetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body

        let user = await usershm.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "user not found register first" })
        }


        let hashedpassword = await bcrypt.hash(newPassword, 10)
        user.password=hashedpassword
      await  user.save()


        return res.status(200).json({ message: "password update sucessfully"})
    } catch (error) {
        console.log(error)
    }
}


export const updatepassword=async(req,res)=>{
    try {
        let {password,updatedPassword}=req.body
        let user= await usershm.findById(req.user._id)
        console.log(user)
        if(!user){
            return res.status(400).json({message:"user  not found"})
        }
        
        let isMatched=await bcrypt.compare(password,user.password)
        if(!isMatched){
            
            return res.status(400).json({message:"invalid credentials"})
        }

        console.log(isMatched)
        
        let hashedpassword= await bcrypt.hash(updatedPassword,10)
        user.password=hashedpassword
        await user.save()
        
        return res.status(200).json({message:"password updated sucessfully"})
    } catch (error) {
        console.log(error)
    }
}

// controller/transactoin.controller.js

import cloudinary from "../Middleware/Cloudinary.js";
import { Depositedmoneyshm } from "../model/depositmoney.model.js";

export const sendmoney = async (req, res) => {
  try {
    const { amount, date } = req.body;
console.log(amount,date)
    if (!amount || !date) {
      return res.status(400).json({ message: "Amount and date are required" });
    }

    // const numericAmount = Number(amount);
    // const dateObj = new Date(date);

    // if (isNaN(numericAmount) || numericAmount <= 0) {
    //   return res.status(400).json({ message: "Amount must be a positive number" });
    // }

    // if (isNaN(dateObj.getTime())) {
    //   return res.status(400).json({ message: "Invalid date format" });
    // }

    const imageUrls = [];
    if (req.files?.length) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          { folder: "products" }
        );
        imageUrls.push(result.secure_url);
      }
    }

    // Ensure that req.user is available (the logged-in user)
    const newDeposit = await Depositedmoneyshm.create({
      amount,
      date,
      images: imageUrls,
      user: req.user._id  // Access logged-in user from req.user
    });

    return res.status(201).json({
      message: "Transaction saved successfully",
      data: newDeposit
    });

  } catch (error) {
    console.error("Send money error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const displaymoneytranstions = async (req, res) => {
  try {
    const transactions = await Depositedmoneyshm.find({ user: req.user._id }) // ✅ Only current user's transactions
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      message: "Transactions retrieved successfully",
      count: transactions.length,
      data: transactions
    });

  } catch (error) {
    console.error("Get data error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

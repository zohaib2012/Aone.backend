import express from "express";
import { config } from "dotenv";
import { connectdatabase } from "./config/dbarear.js";
import { userroutes } from "./api/routes/userroutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import documentroutes from "./api/routes/uploaddocunments.js";
import { fileURLToPath } from 'url';
import { messagesroutes } from "./api/routes/messages.routes.js";
import { personaldetailroutes } from "./api/routes/personaldetail.js";
import depositemoneyroutes from "./api/routes/transactions.routes.js";
import { emailroutes } from "./api/routes/emailverification.js";
import { createaccuntroutes } from "./api/routes/createaccount.routes.js";
import residencedocsroutes from "./api/routes/residencedocs.js";

// Load environment variables from .env
config();

// Connect to the database
connectdatabase();

let startserver = () => {
    let app = express();

    // Middlewares
    app.use(express.json());
    app.use(express.text());
    app.use(cookieParser());


    app.use(
        cors({
            origin: "http://localhost:5173",
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true,
        })
    );


    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);


    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


    app.use('/api/documents', documentroutes);
    app.use('/api/users', userroutes);
    app.use('/api/messages', messagesroutes);
    app.use('/api/p-detail', personaldetailroutes);
    app.use('/api/transactions', depositemoneyroutes);
    app.use('/api/verify', emailroutes);
    app.use("/api/account", createaccuntroutes);
    app.use("/api/residence", residencedocsroutes);

    // Optional error handler for uncaught errors
    app.use((err, req, res, next) => {
        console.error('Server error:', err);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: process.env.NODE_ENV === 'development' ? err.message : 'Error details hidden in production'
        });
    });

    // Start the server on the defined port
    let port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server started at port ${port}`);
    });
};

// Start the server
startserver();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";

dotenv.config();
const app = express();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middlewares
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload route
app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json("No file uploaded");

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ resource_type: "image" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
      stream.end(req.file.buffer);
    });

    res.status(200).json(result.secure_url);
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => res.send("API is running..."));

app.listen(8800, () => console.log("Server running on http://localhost:8800"));

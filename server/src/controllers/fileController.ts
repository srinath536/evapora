import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import File from "../models/fileModel"; // assuming this is your Mongoose model

// Ensure uploads folder exists
const uploadDirectory = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Multer setup
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

export const uploadMiddleware = multer({ storage }).single("file");

// Fixed async controller
export const uploadFile = async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }

  try {
    const newFile = await File.create({
      filename: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
    });

    res.status(200).json({
      message: "File uploaded successfully",
      file: newFile,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error saving file to database",
      error,
    });
  }
};

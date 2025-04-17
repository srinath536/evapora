import { Request, Response, RequestHandler } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import File from "../models/fileModel";

// Set up multer storage to save the file to the `uploads` directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure the `uploads/` directory exists
    const uploadDir = "uploads";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); // Create the uploads directory if it doesn't exist
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Create a unique file name based on the current timestamp
    const fileExtension = path.extname(file.originalname);
    const fileName = Date.now() + fileExtension; // Generate a unique filename
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// File upload handler
export const uploadFile: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const file = req.file;

  if (!file) {
    res.status(400).json({ message: "No file uploaded" });
    return; // Early exit if no file is uploaded
  }

  // Save file metadata to the database
  const newFile = new File({
    filename: file.originalname,
    path: file.path, // Save the local file path
    size: file.size,
  });

  try {
    await newFile.save(); // Save the file metadata to the database (MongoDB)
    res.status(200).json({ message: "File uploaded successfully", file: newFile });
  } catch (err) {
    res.status(500).json({ message: "Error saving file to database", error: err });
  }
};

// Middleware for file upload
export const uploadMiddleware = upload.single("file");

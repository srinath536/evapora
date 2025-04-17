import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

// Initialize Express app
const app = express();

// Ensure the "uploads" directory exists
const uploadDirectory = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Set up file storage using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory); // Directory to store the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// Middleware for JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload route
app.post("/api/upload", upload.single("file"), (req: Request, res: Response): void => {
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }

  res.status(200).json({
    message: "File uploaded successfully",
    file: req.file,
  });
});

export default app;

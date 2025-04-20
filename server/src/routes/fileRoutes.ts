import { Router } from "express";
import { uploadFile, uploadMiddleware } from "../controllers/fileController";

const router = Router();

// POST route for file upload
router.post("/upload", uploadMiddleware, uploadFile);

export default router;

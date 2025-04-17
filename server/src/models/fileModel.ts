import mongoose from "mongoose";

// Define the file schema
const fileSchema = new mongoose.Schema({
  filename: String,
  path: String,
  size: Number,
  uploadedAt: { type: Date, default: Date.now },
});

// Create and export the model
const File = mongoose.model("File", fileSchema);
export default File;

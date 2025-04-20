import { Schema, model, Document } from "mongoose";

// Define the File schema
const fileSchema = new Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: Number, required: true },
});

interface IFile extends Document {
  filename: string;
  path: string;
  size: number;
}

// Create and export the model
const File = model<IFile>("File", fileSchema);
export default File;

import express from "express";
import cors from "cors";
import fileRoutes from "./routes/fileRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", fileRoutes);

export default app;

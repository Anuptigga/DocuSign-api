import "./config/envConfig.js"
import express from 'express';
import cors from 'cors';
import dbConnect from "./config/dbConfig.js";
import authRoute from "./routes/authRoutes.js"
import pdfRoute from "./routes/pdfRoutes.js";
import signRoute from "./routes/signRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
dbConnect();
app.use("/api/auth",authRoute)
app.use("/api/pdf",pdfRoute)
app.use("/api/sign",signRoute)

export default app;
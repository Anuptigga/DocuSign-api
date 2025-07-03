import express from "express";
import {uploadPdf, getAllPdf, getPdf, deletePdf} from "../controllers/pdfControllers.js"
import { authenticated } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js"

const router = express.Router()

router.post("/upload", authenticated, upload.single("file"), uploadPdf);
router.get("/", authenticated, getAllPdf)
router.get("/:id", authenticated, getPdf)
router.delete("/:id", authenticated, deletePdf)

export default router;
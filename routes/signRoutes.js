import express from "express";
import { authenticated } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";
import { uploadSign, getAllSign, getSign, deleteSign } from "../controllers/signController.js";

const router = express.Router();

router.post('/upload', authenticated, upload.single("signature"), uploadSign);
router.get('/', authenticated, getAllSign);
router.get('/:id', authenticated, getSign);
router.delete('/:id', authenticated, deleteSign);

export default router;
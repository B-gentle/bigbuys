import express from "express";
import { createCombo, getCombo } from "../controllers/foodController";
import { authenticate, authorize } from "../middlewares/authMiddleware";
import upload from "../middlewares/uploadMiddleware";
import { Roles } from "../commons/types";
const router = express.Router();

router.post("/combo/create", authenticate, authorize(Roles.admin, Roles.chef), upload.single("image"), createCombo);
router.get("/combo", getCombo);

export default router;
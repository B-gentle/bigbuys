import express from "express";
import { createCombo, getComboById, getCombos } from "../controllers/foodController";
import { authenticate, authorize } from "../middlewares/authMiddleware";
import upload from "../middlewares/uploadMiddleware";
import { Roles } from "../commons/types";
const router = express.Router();

router.post("/combo/create", authenticate, authorize(Roles.admin, Roles.chef), upload.single("image"), createCombo);
router.get("/combo", getCombos);
router.get("/combo/:id", getComboById);

export default router;
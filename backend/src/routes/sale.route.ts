import express from "express";
import { createSale, getMySales, getDashboard } from "../controllers/sale.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", protect, createSale);
router.get("/",protect, getMySales);
router.get("/dashboard", protect, getDashboard);

export default router;
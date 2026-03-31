import express from "express";
import { addProduct, getProducts, updateProduct, deleteProduct } from "../controllers/product.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", protect, addProduct);
router.get("/", protect, getProducts);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);
export default router;
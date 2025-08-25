import express from "express";
import { createProduct, getProducts } from "../controllers/product";

const router = express.Router();

router.get("/supplier/products", getProducts);
router.post("/product/add", createProduct);

export { router as default, router };

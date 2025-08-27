import express from "express";
import {
  createProduct,
  getProducts,
  uploadProductImage,
} from "../controllers/product";
import { uploads } from "../utils/multer";
import limiter from "../middlewares/rate-limiter";

const router = express.Router();

router.get("/products", getProducts);
router.post("/product/add", limiter, uploads.single("imageUrl"), createProduct);
router.patch(
  "/products/upload-image",
  limiter,
  uploads.single("imageUrl"),
  uploadProductImage
);

export { router as default, router };

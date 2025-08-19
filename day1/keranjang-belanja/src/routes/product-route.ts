import express = require("express");
import productController = require("../controllers/product-controller");

const router = express.Router();

router.get("/products", productController.getProducts);
router.post("/products", productController.createProduct);
router.delete("/products", productController.deleteProduct);
router.patch("/products", productController.updateProduct);

export default router;

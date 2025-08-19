import express = require("express");
import orderController = require("../controllers/order-controller");

const router = express.Router();

router.get("/orders", orderController.getOrders);
router.post("/orders", orderController.createOrder);
router.delete("/orders", orderController.deleteOrder);
router.patch("/orders", orderController.updateOrder);

export default router;

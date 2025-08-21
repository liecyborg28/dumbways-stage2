import express from "express";
import { getOrders, getOrdersSummary } from "../controllers/order";

const router = express.Router();

router.get("/orders", getOrders);
router.get("/orders/summary", getOrdersSummary);

export { router as default, router };

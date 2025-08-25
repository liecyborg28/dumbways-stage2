import express from "express";
import { updateStock } from "../controllers/supplier";

const router = express.Router();

router.patch("/suppliers/stock", updateStock);

export { router as default, router };

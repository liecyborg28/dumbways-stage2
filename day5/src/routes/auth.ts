import express from "express";
import { handleRegister, handleLogin, handleReset } from "../controllers/auth";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

router.post("/auth/register", handleRegister);
router.post("/supplier/login", handleLogin);
router.patch("/auth/reset", handleReset);

router.get("/me", authenticate, (req, res) => {
  res.json({ message: "Protected route" });
});

export { router as default, router };

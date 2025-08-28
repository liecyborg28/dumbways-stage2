import express from "express";
import {
  handleRegister,
  handleLogin,
  handleReset,
  handleUploadProfile,
} from "../controllers/auth";
import { authenticate } from "../middlewares/auth";
import { uploads } from "../utils/multer";

const router = express.Router();

router.post("/auth/register", uploads.single("image"), handleRegister);
router.post("/auth/login", handleLogin);
router.patch("/auth/reset", handleReset);
router.patch("/upload/profile", authenticate, handleUploadProfile);
router.get("/me", (req, res) => {
  res.json({ message: "Hello World!" });
});

export { router as default, router };

import express from "express";
import {
  handleRegister,
  handleLogin,
  handleReset,
  uploadProfilePicture,
} from "../controllers/auth";
import { authenticate } from "../middlewares/auth";
import { uploads } from "../utils/multer";
import limiter from "../middlewares/rate-limiter";
import rateLimit from "express-rate-limit";

const router = express.Router();

router.post("/auth/register", uploads.single("imageUrl"), handleRegister);
router.patch(
  "/upload-profile-picture",
  authenticate,
  limiter,
  uploads.single("imageUrl"),
  uploadProfilePicture
);
router.post("/auth/login", handleLogin);
router.patch("/auth/reset", handleReset);

router.get("/me", limiter, (req, res) => {
  res.json({ message: "Protected route" });
});

export { router as default, router };

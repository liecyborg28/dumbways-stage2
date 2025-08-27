import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "src/uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const limits = { fileSize: 2 * 1024 * 1024 }; // 2 MB
const fileFilter = (req, file, cb) => {
  // contoh validasi type juga (misal hanya gambar)
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Hanya file JPG/PNG yang diperbolehkan!"));
  }
};

export const uploads = multer({
  storage,
  limits,
  fileFilter,
});

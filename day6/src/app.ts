import express, { Request, Response, NextFunction } from "express";
import { default as authRouter } from "./routes/auth";
import { default as productRouter } from "./routes/product";
import { authenticate } from "./middlewares/auth";
import { authorize } from "./middlewares/role";
import path from "path";
import { corsMiddleware } from "./utils/cors";
import cookieParser from "cookie-parser";
import limiter from "./middlewares/rate-limiter";

const app = express();

app.use(corsMiddleware);

app.use(limiter);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cookieParser());

app.use("/api/v1", authRouter);
app.use("/api/v1", authenticate, productRouter);

// middleware error handler (paling bawah)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error middleware:", err);

  res.status(err.status || 500).json({
    code: err.status || 500,
    status: "error",
    message: err.message || "Internal server error",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});

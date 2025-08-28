import express, { Request, Response, NextFunction } from "express";
import { corsMiddleware } from "./middlewares/cors";
import path from "path";
import limiter from "./middlewares/limiter";
import { default as authRouter } from "./routes/auth";

const app = express();

app.use(corsMiddleware);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(limiter);

app.use("/api/v1", authRouter);

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

import express, { Request, Response, NextFunction } from "express";
import { default as authRouter } from "./routes/auth";
import { default as productRouter } from "./routes/product";
import { authenticate } from "./middlewares/auth";
import { authorize } from "./middlewares/role";

const app = express();

app.use(express.json());

app.use("/api/v1", authRouter);
app.use("/api/v1", authenticate, authorize, productRouter);

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

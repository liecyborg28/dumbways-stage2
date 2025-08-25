import express, { Request, Response, NextFunction } from "express";
import { default as productRouter } from "./routes/product";
import { default as userRouter } from "./routes/user";
import { default as orderRouter } from "./routes/order";
import { default as transferRouter } from "./routes/transfer-points";
import { default as supplierRouter } from "./routes/supplier";

const app = express();

app.use(express.json());

app.use("/api/v1", userRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", transferRouter);
app.use("/api/v1", supplierRouter);

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

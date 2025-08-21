import express from "express";
import { default as productRouter } from "./routes/product";
import { default as userRouter } from "./routes/user";
import { default as orderRouter } from "./routes/order";

const app = express();

app.use(express.json());

app.use("/api/v1", userRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", orderRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});

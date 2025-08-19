import express from "express";
import productRouter from "./routes/product-route";
import orderRouter from "./routes/order-route";

const app = express();
const PORT = 8081;

app.use(express.json());
app.use("/api/v1", productRouter);
app.use("/api/v1", orderRouter);

app.listen(PORT, () => {
  console.log("server is running on " + PORT);
});

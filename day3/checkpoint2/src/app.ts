import express from "express";
import userRouter from "./routes/user";
import postRouter from "./routes/post";

const app = express();

app.use(express.json());

app.use("/api/v1", userRouter);
app.use("/api/v1", postRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});

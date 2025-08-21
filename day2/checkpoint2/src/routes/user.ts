import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user";

const userRouter = express.Router();

userRouter.get("/user/:id", getUser);
userRouter.get("/users", getUsers);
userRouter.post("/user", createUser);
userRouter.patch("/user/:id", updateUser);
userRouter.delete("/user/:id", deleteUser);

export default userRouter;

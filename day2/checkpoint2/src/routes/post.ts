import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post";

const router = express.Router();

router.get("/post/:id", getPost);
router.get("/posts", getPosts);
router.post("/post", createPost);
router.patch("/post/:id", updatePost);
router.delete("/post/:id", deletePost);

export default router;

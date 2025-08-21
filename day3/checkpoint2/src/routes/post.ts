import express from "express";
import {
  getPosts,
  getPostComments,
  getCommentsSummary,
} from "../controllers/post";

const router = express.Router();

router.get("/posts", getPosts);
router.get("/posts/:id/comments", getPostComments);
router.get("/posts/comments-summary", getCommentsSummary);

export default router;

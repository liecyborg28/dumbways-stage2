import express = require("express");
import postController = require("../controllers/post-controller");

const router = express.Router();

router.get("/posts", postController.getPosts);
router.post("/posts", postController.createPost);
router.delete("/posts", postController.deletePost);

export default router;

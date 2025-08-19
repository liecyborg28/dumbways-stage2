import { Request, Response } from "express";

import { posts, Post } from "../models/post-model";

export const getPosts = (req: Request, res: Response) => {
  res.json(posts);
};

export const createPost = (req: Request, res: Response) => {
  const { title, content } = req.body;

  const newPost: Post = {
    id: posts.length + 1,
    title,
    content,
  };

  posts.push(newPost);

  res.status(200).json(newPost);
};

export const deletePost = (req: Request, res: Response) => {
  const { id } = req.body;

  if (!posts.find((e) => e.id === id)) {
    return res.status(500).json({
      message: "id not found!",
    });
  }

  const deleteIndex = posts.findIndex((e) => e.id === id);

  posts.splice(deleteIndex, 1);

  res.status(200).json(posts);
};

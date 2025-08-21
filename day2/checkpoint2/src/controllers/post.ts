import { Request, Response } from "express";
import { prisma } from "../connections/clients";

export const getPost = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const post = await prisma.post.findUnique({ where: { id } });

    res.status(200).json(post);
  } catch (error) {}
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json({
      code: 200,
      status: "success",
      message: "get posts succesfully!",
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: "error",
      message: "failed to fetch datas!",
    });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, userId } = req.body;

    const post = await prisma.post.create({
      data: { title, content, userId },
    });

    res.status(201).json({
      code: 201,
      status: "success",
      message: "create post successfully!",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: "error",
      message: "failed to create data!",
    });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    console.log("test", req.body);

    const id = parseInt(req.params.id);

    const { title, content } = req.body;

    const post = await prisma.post.update({
      where: { id },
      data: { title, content },
    });

    res.status(201).json({
      code: 201,
      status: "success",
      message: "update post successfully!",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: "error",
      message: "failed to update data!",
    });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const post = await prisma.post.delete({
      where: { id },
    });

    res.status(201).json({
      code: 201,
      status: "success",
      message: "delete post successfully!",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: "error",
      message: "failed to delete data!",
    });
  }
};

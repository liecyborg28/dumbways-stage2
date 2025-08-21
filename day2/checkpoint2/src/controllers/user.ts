import { Request, Response } from "express";
import { prisma } from "../connections/clients";

export const getUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const user = await prisma.user.findUnique({ where: { id } });

    res.status(200).json(user);
  } catch (error) {}
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({
      code: 200,
      status: "success",
      message: "get users succesfully!",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: "error",
      message: "failed to fetch datas!",
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.create({
      data: { username, password },
    });

    res.status(201).json({
      code: 201,
      status: "success",
      message: "create user successfully!",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: "error",
      message: "failed to create data!",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const { username, password } = req.body;

    const user = await prisma.user.update({
      where: { id },
      data: { username, password },
    });

    res.status(201).json({
      code: 201,
      status: "success",
      message: "update user successfully!",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: "error",
      message: "failed to update data!",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const user = await prisma.user.delete({
      where: { id },
    });

    res.status(201).json({
      code: 201,
      status: "success",
      message: "delete user successfully!",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: "error",
      message: "failed to delete data!",
    });
  }
};

import { Request, Response } from "express";
import { prisma } from "../connections/clients";

export const transferPoints = async (
  req: Request,
  res: Response,
  next: any
) => {
  const { amount, senderId, receiverId } = req.body;

  try {
    if (amount <= 0)
      res.status(400).json({
        code: 400,
        status: "error",
        message: "Jumlah point harus lebih dari 0",
      });

    const [sender, receiver] = await Promise.all([
      prisma.user.findUnique({ where: { id: senderId } }),
      prisma.user.findUnique({ where: { id: receiverId } }),
    ]);

    if (!sender)
      res.status(404).json({
        code: 404,
        status: "error",
        message: "Pengirim tidak ditemukan",
      });

    if (!receiver)
      res.status(404).json({
        code: 404,
        status: "error",
        message: "Penerima tidak ditemukan",
      });

    if (sender.points < amount)
      res.status(400).json({ code: 400, message: "Point tidak mencukupi" });

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: senderId },
        data: { points: { decrement: amount } },
      });

      await tx.user.update({
        where: { id: receiverId },
        data: { points: { increment: amount } },
      });

      const [sender, receiver] = await Promise.all([
        prisma.user.findUnique({ where: { id: senderId } }),
        prisma.user.findUnique({ where: { id: receiverId } }),
      ]);

      res.status(200).json({
        code: 200,
        status: "success",
        message: "transfer poin berhasil",
        data: { sender, receiver },
      });
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, status: "error", message: "internal server error" });
  }
};

export const userPoints = async (req: Request, res: Response, next: any) => {
  const userId = req.params.id;

  try {
    const userPoints = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        points: true,
      },
    });

    res.status(200).json({ message: "data ditemukan", data: userPoints });
  } catch (error) {}
};

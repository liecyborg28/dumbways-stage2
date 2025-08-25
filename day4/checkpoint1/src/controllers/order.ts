import { Request, response, Response } from "express";
import { prisma } from "../connections/clients";

export const getOrders = async (req: Request, res: Response) => {
  //   const { sortBy, order, minPrice, maxPrice, limit, offset } = req.query;
  //   try {
  //     const orders = await prisma.order.findMany();
  //     res.status(200).json({
  //       code: 200,
  //       status: "success",
  //       message: "get orders succesfully!",
  //       data: orders,
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       code: 500,
  //       status: "error",
  //       message: "failed to fetch datas!",
  //     });
  //   }
};

export const getOrdersSummary = async (req: Request, res: Response) => {
  //   try {
  //     const groupOrders = await prisma.order.groupBy({
  //       by: ["userId"],
  //       _sum: {
  //         qty: true,
  //       },
  //     });
  //     // 2. Ambil user detail dari userId hasil groupBy
  //     const users = await prisma.user.findMany({
  //       where: {
  //         id: { in: groupOrders.map((g) => g.userId) },
  //       },
  //     });
  //     // 3. Gabungkan hasilnya
  //     const result = groupOrders.map((g) => ({
  //       orderTotal: g._sum.qty,
  //       user: users.find((u) => u.id === g.userId), // join manual
  //     }));
  //     res.status(200).json({
  //       code: 200,
  //       status: "success",
  //       message: "get orders succesfully!",
  //       data: result,
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       code: 500,
  //       status: "error",
  //       message: "failed to fetch datas!",
  //     });
  //   }
};

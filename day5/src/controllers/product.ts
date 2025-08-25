import { Request, Response } from "express";
import { Prisma } from "../../generated/prisma";
import { prisma } from "../connections/client";
import { verifyToken } from "../utils/jwt";
import { productSchema } from "../validation/auth";

export const getProducts = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];

  const decoded = verifyToken(token);
  (req as any).user = decoded as any;

  const { sortBy, order, minPrice, maxPrice, limit, offset } = req.query;

  // filter
  const filters: any = {};

  if (minPrice) {
    filters.price = { gte: parseFloat(minPrice as string) };
  }

  if (maxPrice) {
    filters.price = {
      ...(filters.price || {}),
      lte: parseFloat(maxPrice as string),
    };
  }

  filters.userId = decoded.id;

  try {
    const products = await prisma.product.findMany({
      where: filters,
      orderBy: {
        [sortBy as string]: (order as "asc") || "desc",
      },
      take: Number(limit),
      skip: Number(offset),
    });

    res.status(200).json({
      code: 200,
      status: "success",
      message: "get products succesfully!",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: "error",
      message: "failed to fetch datas!",
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { error } = productSchema.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const { name, price, stock, userId } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        stock: parseFloat(stock),
        userId: parseFloat(userId),
      } as Prisma.ProductUncheckedCreateInput,
    });

    res.status(201).json({
      code: 201,
      status: "success",
      message: "create product successfully!",
      data: product,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      code: 500,
      status: "error",
      message: "failed to create data!",
    });
  }
};

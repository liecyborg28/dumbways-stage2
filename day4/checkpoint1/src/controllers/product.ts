import { Request, Response } from "express";
import { prisma } from "../connections/clients";

export const getProduct = async (req: Request, res: Response) => {
  //   try {
  //     const id = parseInt(req.params.id);
  //     const product = await prisma.product.findUnique({ where: { id } });
  //     res.status(200).json(product);
  //   } catch (error) {
  //     res.status(500).json({
  //       code: 500,
  //       status: "error",
  //       message: "failed to fetch data!",
  //     });
  //   }
};

export const getProducts = async (req: Request, res: Response) => {
  //   const { sortBy, order, minPrice, maxPrice, limit, offset } = req.query;
  //   // filter
  //   const filters: any = {};
  //   if (minPrice) {
  //     filters.price = { gte: parseFloat(minPrice as string) };
  //   }
  //   if (maxPrice) {
  //     filters.price = {
  //       ...(filters.price || {}),
  //       lte: parseFloat(maxPrice as string),
  //     };
  //   }
  //   try {
  //     const products = await prisma.product.findMany({
  //       where: filters,
  //       orderBy: {
  //         [sortBy as string]: (order as "asc") || "desc",
  //       },
  //       take: Number(limit),
  //       skip: Number(offset),
  //     });
  //     res.status(200).json({
  //       code: 200,
  //       status: "success",
  //       message: "get products succesfully!",
  //       data: products,
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       code: 500,
  //       status: "error",
  //       message: "failed to fetch datas!",
  //     });
  //   }
};

export const createProduct = async (req: Request, res: Response) => {
  //   try {
  //     const { name, price, stock } = req.body;
  //     const product = await prisma.product.create({
  //       data: { name, price: parseFloat(price), stock: parseFloat(stock) },
  //     });
  //     res.status(201).json({
  //       code: 201,
  //       status: "success",
  //       message: "create product successfully!",
  //       data: product,
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       code: 500,
  //       status: "error",
  //       message: "failed to create data!",
  //     });
  //   }
};

export const updateProduct = async (req: Request, res: Response) => {
  //   try {
  //     const id = parseInt(req.params.id);
  //     const { name, price } = req.body;
  //     const product = await prisma.product.update({
  //       where: { id },
  //       data: { name, price: parseFloat(price) },
  //     });
  //     res.status(201).json({
  //       code: 201,
  //       status: "success",
  //       message: "update product successfully!",
  //       data: product,
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       code: 500,
  //       status: "error",
  //       message: "failed to update data!",
  //     });
  //   }
};

export const deleteProduct = async (req: Request, res: Response) => {
  //   try {
  //     const id = parseInt(req.params.id);
  //     const product = await prisma.product.delete({
  //       where: { id },
  //     });
  //     res.status(201).json({
  //       code: 201,
  //       status: "success",
  //       message: "delete product successfully!",
  //       data: product,
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       code: 500,
  //       status: "error",
  //       message: "failed to delete data!",
  //     });
  //   }
};

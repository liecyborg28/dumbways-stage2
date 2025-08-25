import { NextFunction, Request, Response } from "express";
import { prisma } from "../connections/clients";

export const updateStock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId, stocks } = req.body;

    const isFoundNotNumber = stocks.find(
      (e: any) =>
        typeof e.stock !== "number" || Number.isNaN(e.stock) || !e.stock
    );

    if (isFoundNotNumber) {
      res.status(400).json({
        code: 400,
        status: "error",
        message: `stock untuk supplier id: ${isFoundNotNumber.supplierId} harus bilangan bulat`,
        data: isFoundNotNumber,
      });
    }

    const isFoundNegative = stocks.find((e: any) => e.stock < 0);

    if (isFoundNegative) {
      throw Error(
        `stock untuk supplier id: ${isFoundNegative.supplierId} harus tidak boleh negatif`
      );

      // {
      //   code: 400,
      //   status: "error",
      //   message: `stock untuk supplier id: ${isFoundNegative.supplierId} harus tidak boleh negatif`,
      //   data: isFoundNegative,
      // };
    }

    const suppliers = await Promise.all(
      stocks.map((e: any) =>
        prisma.supplier.findUnique({ where: { id: e.supplierId } })
      )
    );

    if (suppliers.some((s) => !s)) {
      res.status(400).json({
        code: 400,
        status: "error",
        message: "salah satu supplier id tidak ditemukan!",
      });
    }

    await prisma.$transaction(async (tx) => {
      const updates = await Promise.all(
        stocks.map((e: any) => {
          tx.supplier.update({
            where: { id: e.supplierId, productId },
            data: { stock: e.stock },
          });
        })
      );

      res.status(200).json({
        code: 200,
        status: "success",
        message: "data berhasil diupdate",
        data: stocks,
      });
    });
  } catch (error) {
    next(error);
    // res
    //   .status(500)
    //   .json({ code: 500, status: "error", message: "internal server error" });
  }
};

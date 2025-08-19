import { Request, Response } from "express";

import { products, Product } from "../models/product-model";

export const getProducts = (req: Request, res: Response) => {
  res.json(products);
};

export const createProduct = (req: Request, res: Response) => {
  const { name, price } = req.body;

  const newProduct: Product = {
    id: products.length + 1,
    name,
    price,
  };

  products.push(newProduct);

  res.status(200).json(newProduct);
};

export const deleteProduct = (req: Request, res: Response) => {
  const { id } = req.body;

  if (!products.find((e) => e.id === id)) {
    return res.status(500).json({
      message: "id not found!",
    });
  }

  const deleteIndex = products.findIndex((e) => e.id === id);

  products.splice(deleteIndex, 1);

  res.status(200).json(products);
};

export const updateProduct = (req: Request, res: Response) => {
  const { id, name, price } = req.body;

  if (!products.find((e) => e.id === id)) {
    return res.status(500).json({
      message: "id not found!",
    });
  }

  const updateIndex = products.findIndex((e) => e.id === id);

  products[updateIndex] = { id, name, price };

  res.status(200).json(products);
};

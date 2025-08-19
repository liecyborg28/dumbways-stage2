import { Request, Response } from "express";

import { orders, Order } from "../models/order-model";

import { products, Product } from "../models/product-model";

export const getOrders = (req: Request, res: Response) => {
  const ordersMap = orders.map((e) => ({
    id: e.id,
    product: products.find((el) => el.id === e.productId),
    qty: e.qty,
  }));

  res.json(ordersMap);
};

export const createOrder = (req: Request, res: Response) => {
  const { productId, qty } = req.body;

  const newOrder: Order = {
    id: orders.length + 1,
    productId,
    qty,
  };

  orders.push(newOrder);

  const ordersMap = orders.map((e) => ({
    id: e.id,
    product: products.find((el) => el.id === e.productId),
    qty: e.qty,
  }));

  res.status(200).json(ordersMap);
};

export const deleteOrder = (req: Request, res: Response) => {
  const { id } = req.body;

  if (!orders.find((e) => e.id === id)) {
    return res.status(500).json({
      message: "id not found!",
    });
  }

  const deleteIndex = orders.findIndex((e) => e.id === id);

  orders.splice(deleteIndex, 1);

  res.status(200).json(orders);
};

export const updateOrder = (req: Request, res: Response) => {
  const { id, productId, qty } = req.body;

  if (!orders.find((e) => e.id === id)) {
    return res.status(500).json({
      message: "id not found!",
    });
  }

  const updateIndex = orders.findIndex((e) => e.id === id);

  orders[updateIndex] = { id, productId, qty };

  const ordersMap = orders.map((e) => ({
    id: e.id,
    product: products.find((el) => el.id === e.productId),
    qty: e.qty,
  }));

  res.status(200).json(ordersMap);
};

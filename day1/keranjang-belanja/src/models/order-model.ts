export interface Order {
  id: number;
  productId: number;
  qty: number;
}

export const orders: Order[] = [
  {
    id: 1,
    productId: 1,
    qty: 2,
  },
  {
    id: 2,
    productId: 1,
    qty: 3,
  },
];
